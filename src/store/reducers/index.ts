import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export const rootReducer = combineReducers({
  item: itemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
