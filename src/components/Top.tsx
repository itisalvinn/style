import React, {useState} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';
import {itemsRef} from '../firebase';

// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
// TODO: add functionality to retrieve existing items in the database
export const Top: React.FC = () => {
    
    const [tops, setTops] = useState<Item[]>([]);

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
        const query = itemsRef.orderByChild("id").equalTo(selectedItem.id);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            console.log(childKey);
            if(childKey){
              itemsRef.set(newItems);
            }
            else{
              throw new Error("unable to delete target item by id");
            }
          });
        });

        setTops(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        itemsRef.push(newItem);
        setTops([...tops, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removeId = tops.find(e => e.id === id)?.id!;
        let removedItem = tops.filter(e => e.id != id);

        // firebase snapshot is always a list, even if there is only a single match
        // query based on id to be removed, then access the snapshot and remove it
        const query = itemsRef.orderByChild("id").equalTo(removeId);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              itemsRef.child(childKey).remove();
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