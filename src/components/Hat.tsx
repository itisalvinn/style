import React, {useState, useEffect} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';
import {databaseRef} from '../firebase';

// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
export const Hat: React.FC = () => {
    
    const [hats, setHats] = useState<Item[]>([]);
    const hatRef = databaseRef.ref('hat/')

    // retrieve existing hat data from db
    useEffect(() => {
      hatRef.on('value', (snapshot) => {
        
        let items = snapshot.val();
        let newState = [];
        for (let item in items){
          newState.push({
            id: items[item].id,
            complete: items[item].complete,
            text: items[item].text
          });
        }
        setHats(newState);
      });
    },[])

    // toggle checkbox
    let toggleItem: ToggleItem = (selectedItem: Item, type: string) => {

        let newItems = hats.map(item => {
          if (item === selectedItem){
            return {
              ...item,
              complete: !item.complete,
            };
          }
          return item;
        });

        const query = hatRef.orderByChild("id").equalTo(selectedItem.id);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              hatRef.set(newItems);
            }
            else{
              throw new Error("unable to find target item by id");
            }
          });
        });

        setHats(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        hatRef.push(newItem);
        setHats([...hats, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removeId = hats.find(e => e.id === id)?.id!;
        let removedItem = hats.filter(e => e.id != id);

        const query = hatRef.orderByChild("id").equalTo(removeId);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              hatRef.child(childKey).remove();
            }
            else{
              throw new Error("unable to find target item by id");
            }
          });
        });

        setHats(removedItem);
      }

    return(
        <AllPieces items={hats} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="Hats"/>
    );
};