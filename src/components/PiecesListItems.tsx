import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Checkbox } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {makeStyles} from '@material-ui/core/styles';

interface Props {
    item: Item;
    toggleItem: ToggleItem;
    deleteItem: DeleteItem;
    type: string;
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
// add delete confirmation
export const PiecesListItem: React.FC<Props> = ({item, toggleItem, deleteItem, type}) => {
    const styles = useStyles();

    return (
        <ListItem style = {{textDecoration: item.complete ? 'line-through' : undefined}}>
            <ListItemIcon>
                <Checkbox
                    checked={item.complete}
                    className={styles.checkBox}
                    onClick={()=>{
                        toggleItem(item, type);
                        alert(type);
                    }}
                /> {' '}
            </ListItemIcon>
            <ListItemText primary={`${item.text}`}/>
            <IconButton 
                aria-label="delete"
                className={styles.deleteBtn}
                onClick={e => {
                    deleteItem(item.id)
                }}>
                <DeleteIcon fontSize="large"/>
            </IconButton>    
        </ListItem>
    );
};