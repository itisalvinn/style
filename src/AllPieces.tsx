import React, {useState} from 'react';
import {TodoList} from './TodoList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

interface Props{
    piece?: Piece;
}


// a list of TodoLists (change to garment list or something later)
export const AllPieces: React.FC<Props> = (piece) => {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    }
    return (
        <List>
            <ListItem button onClick={handleClick}>
                <ListItemText primary="top"/>
                {open ? <ExpandMore/> : <ExpandLess/>}
            </ListItem>
            <Collapse in={!open} timeout="auto">
                <List component="div" disablePadding>
                    <ListItemText primary="nested stuff"/>
                </List>
            </Collapse>
        </List>
    );
};