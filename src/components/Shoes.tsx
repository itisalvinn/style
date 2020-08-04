import React, {useState, useEffect} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';
import {databaseRef} from '../firebase';


// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
export const Shoes: React.FC = () => {
    
    const [shoes, setShoes] = useState<Item[]>([]);
    const shoeRef = databaseRef.ref('shoes/')

    // retrieve existing shoe data from db
    useEffect(() => {
      shoeRef.on('value', (snapshot) => {
 
        let items = snapshot.val();
        let newState = [];
        for (let item in items){
          newState.push({
            id: items[item].id,
            complete: items[item].complete,
            text: items[item].text
          });
        }
        setShoes(newState);
      });
    },[])

    // toggle checkbox
    let toggleItem: ToggleItem = (selectedItem: Item, type: string) => {

        let newItems = shoes.map(item => {
          if (item === selectedItem){
            return {
              ...item,
              complete: !item.complete,
            };
          }
          return item;
        });

        const query = shoeRef.orderByChild("id").equalTo(selectedItem.id);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              shoeRef.set(newItems);
            }
            else{
              throw new Error("unable to find target item by id");
            }
          });
        });

        setShoes(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        shoeRef.push(newItem);
        setShoes([...shoes, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removeId = shoes.find(e => e.id === id)?.id!;
        let removedItem = shoes.filter(e => e.id != id);

        const query = shoeRef.orderByChild("id").equalTo(removeId);
        query.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            if(childKey){
              shoeRef.child(childKey).remove();
            }
            else{
              throw new Error("unable to find target item by id");
            }
          });
        });

        setShoes(removedItem);
      }

    return(
        <AllPieces items={shoes} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="Shoes"/>
    );
};