import React, {useState} from 'react';
import {TodoList} from './TodoList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import shortid from 'shortid';

interface Props{
    piece?: Piece;
    todos: Todo[];
    toggleTodo: ToggleTodo;
    deleteItem: DeleteItem;
}

// temp thing here -- just testing the todo component populating within the drop down menu
const initialTodos: Todo[] = [
    {
      id: shortid.generate(),
      text: "leet code ",
      complete: false,
    },
    {
      id: shortid.generate(),
      text: "practice for interviews",
      complete: true,
    },
  ];

// a list of TodoLists (change to garment list or something later)
export const AllPieces: React.FC<Props> = ({piece, todos, toggleTodo, deleteItem}) => {
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
                    <TodoList todos={todos} toggleTodo={toggleTodo} deleteItem={deleteItem}/>
                </List>
            </Collapse>
        </List>
    );
};