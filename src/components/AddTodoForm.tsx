import React, {useState} from 'react';

interface Props {
    addItem: AddItem;
}

export const AddTodoForm: React.FC<Props> = ({addItem}) => {
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
                        addItem(text);
                    }
                    setText('')
                }}
            >
                Add Item
            </button>
        </form>
    )
}