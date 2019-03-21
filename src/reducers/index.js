import { combineReducers } from 'redux';
import books from './books';
import loading from './loading';
import memo from './memo';

const reducers = combineReducers({
  books,
  loading,
  memo,
});

export default reducers;
