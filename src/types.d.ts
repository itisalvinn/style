// declaration file with only type info
interface Item {
    id: string;
    text: string;
    complete: boolean;
}

interface Pieces {
    type?: string;
    items: Item[];
}
type ToggleItem = (selectedTodo: Item, type: string) => void;

type DeleteItem = (id: string) => void;

type AddItem = (text: string) => void;