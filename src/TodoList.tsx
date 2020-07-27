import React from 'react';
import {TodoListItem} from './TodoListItem';
import List from '@material-ui/core/List';

interface Props {
    todos: Todo[];
    toggleTodo: ToggleTodo;
    deleteItem: DeleteItem;
}

// unordered list of todoListItems -- has text, toggle
export const TodoList: React.FC<Props> = ({todos, toggleTodo, deleteItem}) => {
    return (
        <List>
            {todos.map(todo => (
                <TodoListItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteItem={deleteItem}/>
            ))}
        </List>
    );
};