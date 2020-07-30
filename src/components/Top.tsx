import React, {useState} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';


// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
export const Top: React.FC = () => {
    
      // react hook -- removed need for initial todo
    const [tops, setTops] = useState<Item[]>([]);

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
        setTops(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        setTops([...tops, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removedItem = tops.filter(e => e.id != id);
        setTops(removedItem);
      }

    return(
        <AllPieces items={tops} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="Top"/>
    );
};