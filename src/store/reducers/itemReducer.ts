import { ItemAction, ItemState, ItemActionTypes } from '../../types/item';

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

const itemReducer = (state = initialState, action: ItemAction): ItemState => {
  switch (action.type) {
    case ItemActionTypes.FETCH_ITEMS:
      return {
        loading: true,
        error: null,
        items: [],
      };
    case ItemActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        loading: false,
        error: null,
        items: action.payload,
      };
    case ItemActionTypes.FETCH_ITEMS_ERROR:
      return {
        loading: false,
        error: action.payload,
        items: [],
      };
    case ItemActionTypes.ACTION_ITEM:
      return {
        loading: false,
        error: null,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
