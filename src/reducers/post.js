import { cloneDeep } from 'lodash';
import {
  USER_PROFILE_SEND,
  USER_MEMOS_SEND,
  USER_BOOKS_SEND,
} from '../actions/ActionTypes';

const initialState = {
  profile: {
    name: '',
    imgSrc: '',
    bookTotal: null,
    memoTotal: null,
  },
  books: [],
  memos: [],
  memoSearching: true,
};

export default (state = initialState, action) => {
  const copiedState = cloneDeep(state);

  switch (action.type) {
    case USER_PROFILE_SEND:
      copiedState.profile = action.profile;

      return copiedState;

    case USER_MEMOS_SEND:
      if (action.memos.length) {
        if (!copiedState.memos.length) {
          copiedState.memos = action.memos;
        } else {
          copiedState.memos = [...copiedState.memos, ...action.memos];
        }
      } else {
        copiedState.memoSearching = false;
      }

      return copiedState;

    case USER_BOOKS_SEND:
      copiedState.books = action.books;

      return copiedState;

    default:
      return state;
  }
};
