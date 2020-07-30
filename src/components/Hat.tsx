import React, {useState} from 'react';
import {AllPieces} from './AllPieces';
import shortid from 'shortid';


// TODO: create a base class to reuse this component for top/bottom/outerwear/hats etc.
export const Hat: React.FC = () => {
    
      // react hook -- removed need for initial todo
    const [hats, setHats] = useState<Item[]>([]);

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
        setHats(newItems);
      };
      
      // new item 
      let addItem: AddItem = (text: string) => {
        let newItem = {id: shortid.generate(), text, complete: false};
        setHats([...hats, newItem]);
      };
    
      // remove item
      let deleteItem: DeleteItem = (id: string) => {
        let removedItem = hats.filter(e => e.id != id);
        setHats(removedItem);
      }

    return(
        <AllPieces items={hats} toggleItem={toggleItem} deleteItem={deleteItem} addItem={addItem} type="Hats"/>
    );
};