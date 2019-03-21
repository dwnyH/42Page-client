import {
  LOADING_STATE_SEND,
  BOOK_DATA_SEND,
  CHOSEN_BOOK_SEND,
  ADDED_MEMO_SEND,
} from './ActionTypes';

export function sendLoadingState() {
  return {
    type: LOADING_STATE_SEND,
  };
}

export function sendBookData(keyword, page, isNewKeyword, bookData) {
  return {
    type: BOOK_DATA_SEND,
    keyword,
    page,
    bookData,
    isNewKeyword,
  };
}

export function sendChosenBook(img, title, author, publisher) {
  return {
    type: CHOSEN_BOOK_SEND,
    img,
    title,
    author,
    publisher,
  };
}

export function sendAddedMemo(memo) {
  return {
    type: ADDED_MEMO_SEND,
    memo,
  };
}
