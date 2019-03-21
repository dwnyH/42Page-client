import { cloneDeep } from 'lodash';
import {
  BOOK_DATA_SEND,
} from '../actions/ActionTypes';

const initialState = {
  books: [],
  isLastSearchPage: false,
  keyword: '',
  page: 1,
};

export default (state = initialState, action) => {
  const copiedState = cloneDeep(state);

  switch (action.type) {
    case BOOK_DATA_SEND:
      const newBooks = action.bookData.data.documents.map((document) => {
        const img = document.thumbnail
          ? document.thumbnail
          : 'https://img1.coastalliving.timeinc.net/sites/default/files/field/image/books-stacked.jpg';
        return {
          title: document.title,
          authors: document.authors,
          thumbnail: img,
          publisher: document.publisher,
        };
      });

      copiedState.isLastSearchPage = action.bookData.data.meta.is_end;
      copiedState.keyword = action.keyword;
      copiedState.page = action.page;
      if (action.isNewKeyword) {
        copiedState.books = [...newBooks];
      } else {
        copiedState.books = [...copiedState.books, ...newBooks];
      }

      return copiedState;

    default:
      return state;
  }
};
