import React, {useState} from 'react';

interface Props {
    addTodo: AddTodo;
}

export const AddTodoForm: React.FC<Props> = ({addTodo}) => {
    const [text, setText] = useState('');
    return (
        <form>
            <input 
                type="text"
                value={text}
                onChange={e => {
                    setText(e.target.value);
                }}
            />
            <button 
                type="submit"
                onClick = {e => {
                    e.preventDefault();
                    if(text != ''){
                        addTodo(text);
                    }
                    setText('')
                }}
            >
                Add Item
            </button>
        </form>
    )
}