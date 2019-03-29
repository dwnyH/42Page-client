import { cloneDeep } from 'lodash';
import {
  USER_PROFILE_SEND,
  USER_MEMOS_SEND,
  USER_BOOKS_SEND,
  SELECTED_BOOK_MEMOS_SEND,
  ALL_MEMOS_SEND,
  USER_KEYWORDS_SEND,
  UPDATE,
  SEND_POST_ID,
  SEND_KEYWORD_RESULTS,
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
  keywords: {},
  allMemos: [],
  chosenBook: {
    bookInfo: {},
    selectedBookMemos: [],
  },
  postUserId: '',
  postId: '',
  memoSearching: true,
  allMemosSearching: true,
  postUpdating: false,
  keywordSearchResults: [],
};

export default (state = initialState, action) => {
  const copiedState = cloneDeep(state);

  switch (action.type) {
    case USER_PROFILE_SEND:
      copiedState.profile = action.profile;
      copiedState.postUserId = action.id;

      return copiedState;

    case USER_MEMOS_SEND:
      if (action.memos.length) {
        ;
        if (!copiedState.memos.length || copiedState.postUpdating || action.page === 1) {
          ;
          copiedState.memos = action.memos;
          copiedState.postUpdating = false;
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

    case SELECTED_BOOK_MEMOS_SEND:
      copiedState.chosenBook.bookInfo = action.chosenBook;
      copiedState.chosenBook.selectedBookMemos = action.memos;

      return copiedState;

    case ALL_MEMOS_SEND:
      if (action.allMemos.length) {
        if (!copiedState.allMemos.length || action.isUpdate) {
          copiedState.allMemos = action.allMemos;
          copiedState.postUpdating = action.isUpdate;
        } else {
          copiedState.allMemos = [...copiedState.allMemos, ...action.allMemos];
        }
      } else {
        copiedState.allMemosSearching = false;
      }

      return copiedState;

    case USER_KEYWORDS_SEND:
      copiedState.keywords = action.keywords;

      return copiedState;

    case UPDATE:
      copiedState.postUpdating = action.update;

      return copiedState;

    case SEND_POST_ID:
      copiedState.postId = action.postId;

      return copiedState;

    case SEND_KEYWORD_RESULTS:
      copiedState.keywordSearchResults = action.users;

      return copiedState;

    default:
      return state;
  }
};
