import React, {useState} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';


// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
export const Bottom: React.FC = () => {
    
      // react hook -- removed need for initial todo
    const [bottoms, setBottoms] = useState<Item[]>([]);

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
        setBottoms(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        setBottoms([...bottoms, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removedItem = bottoms.filter(e => e.id != id);
        setBottoms(removedItem);
      }

    return(
        <AllPieces items={bottoms} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="Bottom"/>
    );
};