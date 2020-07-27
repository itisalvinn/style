// declaration file with only type info
interface Todo {
    id: string;
    text: string;
    complete: boolean;
}

type ToggleTodo = (selectedTodo: Todo) => void;

type DeleteItem = (id: string) => void;

type AddTodo = (text: string) => void;