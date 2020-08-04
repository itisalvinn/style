import React, {useState, useEffect} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';
import {databaseRef} from '../firebase';

// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
// TODO: potentially fix issue where ref.push ID is overwritten with array index values on ref.set
export const Top: React.FC = () => {
    
    const [tops, setTops] = useState<Item[]>([]);
    const topRef = databaseRef.ref('top/')

    // retrieve existing tops data from db
    useEffect(() => {
      topRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items){
          newState.push({
            id: items[item].id,
            complete: items[item].complete,
            text: items[item].text
          });
        }
        setTops(newState);
      });
    },[])

    // toggle checkbox
    let toggleItem: ToggleItem = (selectedItem: Item, type: string) => {

        let newItems = tops.map(item => {
          if (item === selectedItem){
            return {
              ...item,
              complete: !item.complete,
            };
          }
          return item;
        });

        // update checkbox in db
        const query = topRef.orderByChild("id").equalTo(selectedItem.id);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              topRef.set(newItems);
            }
            else{
              throw new Error("unable to find target item by id");
            }
          });
        });

        setTops(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        topRef.push(newItem);
        setTops([...tops, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removeId = tops.find(e => e.id === id)?.id!;
        let removedItem = tops.filter(e => e.id != id);

        // firebase snapshot is always a list, even if there is only a single match
        // we query based on target id, then access the snapshot and remove it
        const query = topRef.orderByChild("id").equalTo(removeId);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              topRef.child(childKey).remove();
            }
            else{
              throw new Error("unable to find target item by id");
            }
          });
        });

        setTops(removedItem);
      }

    return(
        <AllPieces items={tops} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="Top"/>
    );
};