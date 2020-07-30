import React, {useState} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';


// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
export const Shoes: React.FC = () => {
    
      // react hook -- removed need for initial todo
    const [shoes, setShoes] = useState<Item[]>([]);

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
        setShoes(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        setShoes([...shoes, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removedItem = shoes.filter(e => e.id != id);
        setShoes(removedItem);
      }

    return(
        <AllPieces items={shoes} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="Shoes"/>
    );
};