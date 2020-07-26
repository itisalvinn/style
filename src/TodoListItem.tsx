import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
    todo: Todo;
    toggleTodo: ToggleTodo;
}

// list {label + input}
// need to add firebase remove functionality in the delete btn
export const TodoListItem: React.FC<Props> = ({todo, toggleTodo}) => {
    return (
        <li>
            <label
                style = {{textDecoration: todo.complete ? 'line-through' : undefined}}
            >
                <input 
                    type="checkbox"
                    checked={todo.complete}
                    onClick={() => {
                        toggleTodo(todo);
                    }} 
                /> {' '}
                {todo.text}
                <IconButton 
                    aria-label="delete">
                    <DeleteIcon fontSize="large"/>
                </IconButton>    
            </label>
        </li>
    );
};