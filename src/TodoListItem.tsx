import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Checkbox } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';

interface Props {
    todo: Todo;
    toggleTodo: ToggleTodo;
}

const useStyles = makeStyles(theme => ({
    deleteBtn: {
        backgroundColor: 'transparent',
        "&:hover": {backgroundColor: 'white'}
    },
    checkBox: {
        "&:hover": {backgroundColor: 'transparent'}
    }
}));

// need to add firebase remove functionality in the delete btn
export const TodoListItem: React.FC<Props> = ({todo, toggleTodo}) => {
    const styles = useStyles();
    return (
        <ListItem style = {{textDecoration: todo.complete ? 'line-through' : undefined}}>
            <ListItemIcon>
                <Checkbox
                    checked={todo.complete}
                    className={styles.checkBox}
                    onClick={()=>{
                        toggleTodo(todo);
                    }}
                /> {' '}
            </ListItemIcon>
            <ListItemText primary={`${todo.text}`}/>
            <IconButton 
                aria-label="delete"
                className={styles.deleteBtn}>
                <DeleteIcon fontSize="large"/>
            </IconButton>    
        </ListItem>
    );
};