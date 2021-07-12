export interface ItemState {
    items: ItemInterface[];
    loading: boolean;
    error: null | string
}

export enum ItemActionTypes {
    FETCH_ITEMS = 'FETCH_ITEMS',
    FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS',
    FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR',
    ACTION_ITEM = 'ACTION_ITEMS',
}

interface FetchItemsAction {
    type: ItemActionTypes.FETCH_ITEMS
}
export interface ItemInterface {
    id: number,
    about: string | undefined;
    isCompleted: boolean;
}

interface FetchItemsSuccessAction {
    type: ItemActionTypes.FETCH_ITEMS_SUCCESS;
    payload: ItemInterface[];
}

interface FetchItemsErrorAction {
    type: ItemActionTypes.FETCH_ITEMS_ERROR;
    payload: string;
}

interface ActionItemAction {
    type: ItemActionTypes.ACTION_ITEM;
    payload: ItemInterface[];
}

export type ItemAction =
    FetchItemsAction |
    FetchItemsSuccessAction |
    FetchItemsErrorAction |
    ActionItemAction;
