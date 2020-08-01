import React, {useState} from 'react';
import {PiecesList} from './PiecesList';
import {AddTodoForm} from './AddTodoForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

interface Props{
    items: Item[];
    toggleItem: ToggleItem;
    deleteItem: DeleteItem;
    addItem: AddItem; 
    type: string;
}

// houses all piece components -- top / bottom / outwear / hat etc.
export const AllPieces: React.FC<Props> = ({items, toggleItem, deleteItem, addItem, type}) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={type}/>
                {open ? <ExpandMore/> : <ExpandLess/>}
            </ListItem>
            <Collapse in={!open} timeout="auto">
                <List component="div" disablePadding>
                    <PiecesList items={items} toggleItem={toggleItem} deleteItem={deleteItem} type={type}/>
                </List>
                <AddTodoForm addItem={addItem}/>
            </Collapse>
        </List>
    );
};