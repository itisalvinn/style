import React from 'react';
import {TodoListItem} from './TodoListItem';
import { type } from 'os';
import { NONAME } from 'dns';
import { red } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';

interface Props {
    todos: Todo[];
    toggleTodo: ToggleTodo;
}

// unordered list of todoListItems -- has text, toggle
export const TodoList: React.FC<Props> = ({todos, toggleTodo}) => {
    return (
        <ul style={{listStyleType: 'none'}}>
            {todos.map(todo => (
                <TodoListItem key={todo.text} todo={todo} toggleTodo={toggleTodo}/>
            ))}
        </ul>
    );
};