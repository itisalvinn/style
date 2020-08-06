import React, {useState, useEffect} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';
import {databaseRef} from '../firebase';


// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
export const Bottom: React.FC = () => {
    
    const [bottoms, setBottoms] = useState<Item[]>([]);
    const bottomRef = databaseRef.ref('bottom/')

    // retrieve existing bottom data from db
    useEffect(() => {
      bottomRef.on('value', (snapshot) => {

        let items = snapshot.val();
        let newState = [];
        for (let item in items){
          newState.push({
            id: items[item].id,
            complete: items[item].complete,
            text: items[item].text
          });
        }
        setBottoms(newState);
      });
    },[])

    // toggle check box
    let toggleItem: ToggleItem = (selectedItem: Item, type: string) => {

        let newItems = bottoms.map(item => {
          if (item === selectedItem){
            return {
              ...item,
              complete: !item.complete,
            };
          }
          return item;
        });

        // update checkbox in db
        const query = bottomRef.orderByChild("id").equalTo(selectedItem.id);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              bottomRef.set(newItems);
            }
            else{
              throw new Error("unable to find target item by id");
            }
          });
        });

        setBottoms(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        bottomRef.push(newItem);
        setBottoms([...bottoms, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removeId = bottoms.find(e => e.id === id)?.id!;
        let removedItem = bottoms.filter(e => e.id != id);

        const query = bottomRef.orderByChild("id").equalTo(removeId);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              bottomRef.child(childKey).remove();
            }
            else{
              throw new Error("unable to find target item by id");
            }
          });
        });

        setBottoms(removedItem);
      }

    return(
        <AllPieces items={bottoms} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="Bottoms"/>
    );
};