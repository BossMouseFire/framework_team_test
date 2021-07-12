import React from 'react';
import {
  Checkbox, Container, IconButton, Input, makeStyles,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch } from 'react-redux';
import { ItemInterface } from '../types/item';
import {
  deleteItem, editItem,
} from '../store/actionCreators/item';
import useTypeSelector from '../hooks/useTypeSelector';

interface ItemProps{
    item: ItemInterface
}
const useStyles = makeStyles({
  inputData: {
    width: '75%',
  },
  buttonAdd: {
    width: '20%',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editItem: {
    width: '80%',
  },
});

const Item:React.FC<ItemProps> = ({ item }: ItemProps) => {
  const dispatch = useDispatch();
  const { items } = useTypeSelector((state) => state.item);
  const styles = useStyles();
  const deleteItemButton = async (
    id: number,
    event: React.MouseEvent<HTMLAnchorElement> |
            React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    await dispatch(deleteItem(id, items));
  };
  const editItemButton = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    field: string,
  ) => {
    if (field === 'isCompleted') {
      const target = event.target as HTMLInputElement;
      const check: boolean = target.checked;
      await dispatch(editItem(id, field, check, items));
    } else {
      const target = event.target as HTMLTextAreaElement;
      const valueChecked: string = target.value;
      await dispatch(editItem(id, field, valueChecked, items));
    }
  };
  return (
    <Container className={styles.itemContainer} key={item.id}>
      <Checkbox
        checked={item.isCompleted}
        onChange={(e) => editItemButton(e, item.id, 'isCompleted')}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Input
        defaultValue={`${item.about}`}
        inputProps={{ 'aria-label': 'description' }}
        color="primary"
        className={styles.editItem}
        onChange={(e) => editItemButton(e, item.id, 'about')}
      />
      <IconButton
        color="secondary"
        aria-label="add to shopping cart"
        onClick={(e) => deleteItemButton(item.id, e)}
      >
        <ClearIcon />
      </IconButton>
    </Container>
  );
};

export default Item;
