import { Dispatch } from 'redux';
import axios from 'axios';
import { ItemInterface, ItemAction, ItemActionTypes } from '../../types/item';

export const fetchItem = () => async (dispatch: Dispatch<ItemAction>) => {
  try {
    dispatch({
      type: ItemActionTypes.FETCH_ITEMS,
    });
    const response = await axios.get(`${process.env.REACT_APP_API}users`);
    dispatch({
      type: ItemActionTypes.FETCH_ITEMS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: ItemActionTypes.FETCH_ITEMS_ERROR,
      payload: e,
    });
  }
};

interface dataAddItem{
  id: number;
  about: string;
  isCompleted: boolean;
}
export const addItem = (
  id: number,
  about: string,
  items: ItemInterface[],
) => async (dispatch: Dispatch<ItemAction>) => {
  try {
    const data:dataAddItem = {
      id,
      about,
      isCompleted: false,
    };
    await axios.post(`${process.env.REACT_APP_API}users`, data);
    dispatch({
      type: ItemActionTypes.ACTION_ITEM,
      payload: [...items, data],
    });
  } catch (e) {
    dispatch({
      type: ItemActionTypes.FETCH_ITEMS_ERROR,
      payload: e,
    });
  }
};

export const deleteItem = (
  id: number,
  items: ItemInterface[],
) => async (dispatch: Dispatch<ItemAction>) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API}users/${id}`);
    const newItems = items.filter((item) => item.id !== id);
    dispatch({
      type: ItemActionTypes.ACTION_ITEM,
      payload: newItems,
    });
  } catch (e) {
    dispatch({
      type: ItemActionTypes.FETCH_ITEMS_ERROR,
      payload: e,
    });
  }
};

export const editItem = (
  id: number,
  field: string,
  value: boolean | string,
  items: ItemInterface[],
) => async (dispatch: Dispatch<ItemAction>) => {
  try {
    const data = {
      [field]: value,
    };
    const newItems = items;
    await axios.patch(`${process.env.REACT_APP_API}users/${id}`, data);
    const index = newItems.map((item) => item.id).indexOf(id);
    if (field === 'isCompleted') {
      if (typeof value === 'boolean') {
        newItems[index].isCompleted = value;
      }
    } else if (typeof value === 'string') {
      newItems[index].about = value;
    }
    dispatch({
      type: ItemActionTypes.ACTION_ITEM,
      payload: newItems,
    });
  } catch (e) {
    dispatch({
      type: ItemActionTypes.FETCH_ITEMS_ERROR,
      payload: e,
    });
  }
};
