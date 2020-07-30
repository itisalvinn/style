import React from 'react';
import {PiecesListItem} from './PiecesListItems';
import List from '@material-ui/core/List';

interface Props {
    items: Item[];
    toggleItem: ToggleItem;
    deleteItem: DeleteItem;
    type: string;
}

// unordered list of todoListItems -- has text, toggle
export const PiecesList: React.FC<Props> = ({items, toggleItem, deleteItem, type}) => {
    return (
        <List>
            {items.map(item => (
                <PiecesListItem key={item.id} item={item} toggleItem={toggleItem} deleteItem={deleteItem} type={type}/>
            ))}
        </List>
    );
};