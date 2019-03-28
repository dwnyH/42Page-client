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
  ALL_MEMOS_SEND,
  USER_KEYWORDS_SEND,
  UPDATE,
  SEND_POST_ID,
  SEND_KEYWORD_RESULTS,
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

export function sendUserProfile(profile, id) {
  return {
    type: USER_PROFILE_SEND,
    profile,
    id,
  };
}

export function sendUserMemos(memos, page) {
  return {
    type: USER_MEMOS_SEND,
    memos,
    page,
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

export function sendAllMemos(allMemos, isUpdate) {
  return {
    type: ALL_MEMOS_SEND,
    allMemos,
    isUpdate,
  };
}

export function sendUserKeywords(keywords, updating) {
  return {
    type: USER_KEYWORDS_SEND,
    keywords,
    updating,
  };
}

export function updatePost(update) {
  return {
    type: UPDATE,
    update,
  };
}

export function sendPostId(postId) {
  return {
    type: SEND_POST_ID,
    postId,
  };
}

export function sendKeywordResults(users) {
  return {
    type: SEND_KEYWORD_RESULTS,
    users,
  };
}
