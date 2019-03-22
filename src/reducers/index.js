import { combineReducers } from 'redux';
import books from './books';
import loading from './loading';
import memo from './memo';
import post from './post';


const reducers = combineReducers({
  books,
  loading,
  memo,
  post,
});

export default reducers;
