import { cloneDeep } from 'lodash';
import {
  CHOSEN_BOOK_SEND,
  HIGHLIGHTS_SEND,
} from '../actions/ActionTypes';

const initialState = {
  book: {
    img: 'https://img1.coastalliving.timeinc.net/sites/default/files/field/image/books-stacked.jpg',
    title: '',
    author: '',
    publisher: '',
  },
  highlights: '',
};

export default (state = initialState, action) => {
  const copiedState = cloneDeep(state);

  switch (action.type) {
    case CHOSEN_BOOK_SEND:
      if (action.img) {
        copiedState.book.img = action.img;
      }

      copiedState.book.title = action.title;
      copiedState.book.author = action.author;
      copiedState.book.publisher = action.publisher;

      return copiedState;

    case HIGHLIGHTS_SEND:
      copiedState.highlights = action.highlights;

      return copiedState;

    default:
      return state;
  }
};
