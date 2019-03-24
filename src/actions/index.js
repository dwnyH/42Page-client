import {
  LOADING_STATE_SEND,
  BOOK_DATA_SEND,
  CHOSEN_BOOK_SEND,
  ADDED_MEMO_SEND,
  HIGHLIGHTS_SEND,
  USER_PROFILE_SEND,
  USER_MEMOS_SEND,
  USER_BOOKS_SEND,
  SELECTED_BOOK_MEMOS_SEND,
  EDITING_STATE_SEND,
  MEMO_STATE_SEND,
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

export function sendHighlights(highlights) {
  return {
    type: HIGHLIGHTS_SEND,
    highlights,
  };
}

export function sendUserProfile(profile) {
  return {
    type: USER_PROFILE_SEND,
    profile,
  };
}

export function sendUserMemos(memos) {
  return {
    type: USER_MEMOS_SEND,
    memos,
  };
}

export function sendUserBooks(books) {
  return {
    type: USER_BOOKS_SEND,
    books,
  };
}

export function sendSelectedMemos(memos, chosenBook) {
  return {
    type: SELECTED_BOOK_MEMOS_SEND,
    memos,
    chosenBook,
  };
}

export function sendAddedMemo(memo) {
  return {
    type: ADDED_MEMO_SEND,
    memo,
  };
}

export function sendEditingState(isNew) {
  return {
    type: EDITING_STATE_SEND,
    isNew,
  };
}

export function sendMemoState(isPrivate) {
  return {
    type: MEMO_STATE_SEND,
    isPrivate,
  };
}
