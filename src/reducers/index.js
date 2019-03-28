import { combineReducers } from 'redux';
import books from './books';
import pageState from './pageState';
import memo from './memo';
import post from './post';


const reducers = combineReducers({
  books,
  pageState,
  memo,
  post,
});

export default reducers;
