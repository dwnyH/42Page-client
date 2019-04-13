import React, { Fragment, Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Navigation from '../components/Navigation/Navigation';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Camera from '../components/Camera/Camera';
import BookSearch from '../components/BookSearch/BookSearch';
import Memo from '../components/Memo/Memo';
import KeywordSearch from '../components/KeywordSearch/KeywordSearch';
import Profile from '../components/Profile/Profile';
import BookPostDetails from '../components/BookPostDetails/BookPostDetails';
import * as actions from '../actions';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.onEditedMemoSubmit = this.onEditedMemoSubmit.bind(this);
    this.onMemoSubmit = this.onMemoSubmit.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    const { sendLoadingState } = this.props;
    sendLoadingState();
  }

  async onEditedMemoSubmit(isPrivate, memo, highlights, book, postId) {
    const { history } = this.props;
    let memoSubmitResponse;

    if (!book.title.length || !highlights.length) {
      return alert('책 또는 하이라이트 정보를 반드시 입력해주세요 :)');
    }

    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';

    try {
      memoSubmitResponse = await axios({
        method: 'put',
        url: `${api}/posts/${postId}`,
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {
          isPrivate,
          addedMemo: memo,
          highlights,
          bookInfo: book,
        },
      });
    } catch (err) {
      console.log(err);
    }

    if (memoSubmitResponse.status === 201) {
      history.push({
        pathname: '/home',
        data: {
          pageState: 'edit',
        },
      });
    }
  }

  async onMemoSubmit(isPrivate, memo, highlights, book) {
    if (!book.title.length || !highlights.length) {
      return alert('책 또는 하이라이트 정보를 반드시 입력해주세요 :)');
    }

    let memoSubmitResponse;
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';
    const { history } = this.props;

    try {
      memoSubmitResponse = await axios({
        method: 'post',
        url: `${api}/users/${id}/posts`,
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {
          isPrivate,
          addedMemo: memo,
          highlights,
          bookInfo: book,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.log(err);
    }

    if (memoSubmitResponse.status === 201) {
      history.push({
        pathname: '/home',
        data: {
          pageState: 'create',
        },
      });
    }
  }

  async deletePost(postId) {
    let deleteRequestResponse;
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';

    try {
      deleteRequestResponse = await axios({
        method: 'delete',
        url: `${api}/posts/${postId}`,
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    } catch (err) {
      console.log(err);
    }

    console.log('deleteResponse', deleteRequestResponse);

    if (deleteRequestResponse.status === 204) {
      history.push({
        pathname: '/home',
        data: {
          pageState: 'delete',
        },
      });
    }
  }

  render() {
    const token = localStorage.getItem('token');
    const {
      loading,
      books,
      bookSearch,
      sendChosenBook,
      sendHighlights,
      getUserProfile,
      profile,
      getUserMemos,
      memos,
      getUserBooks,
      userBooks,
      memoSearching,
      getSelectedMemos,
      chosenBookForMemos,
      memosWithBook,
      sendAddedMemo,
      sendEditingState,
      memoInfo,
      sendMemoState,
      getAllMemos,
      allMemosSearching,
      allMemos,
      getUserKeywords,
      postInfo,
      update,
      postId,
      sendPostId,
      postUserId,
      getKeywordsRelatedUsers,
      keywordSearchResults,
      sendProfilePageState,
      isMemoPage,
    } = this.props;

    return (
      loading
        ? (
          <div className="loading">
            <i className="fas fa-leaf" />
          </div>
        )
        : (
          <Fragment>
            <Route
              exact
              path="/"
              render={props => (
                !token ? (
                  <Redirect from="/" to="/login" />
                ) : (
                  <Home
                    {...props}
                    getAllMemos={getAllMemos}
                    allMemosSearching={allMemosSearching}
                    allMemos={allMemos}
                  />
                )
              )}
            />
            <Route
              exact
              path="/home"
              render={props => (
                <Home
                  {...props}
                  update={update}
                  getAllMemos={getAllMemos}
                  allMemosSearching={allMemosSearching}
                  allMemos={allMemos}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} />
              )}
            />
            <Route
              exact
              path="/keywordSearch"
              render={props => (
                <KeywordSearch
                  {...props}
                  onSubmit={getKeywordsRelatedUsers}
                  keywordSearchResults={keywordSearchResults}
                />
              )}
            />
            <Route
              exact
              path="/camera"
              render={props => (
                <Camera
                  {...props}
                  addMemoBtnClick={sendHighlights}
                  sendEditingState={sendEditingState}
                />
              )}
            />
            <Route
              exact
              path="/memo"
              render={props => (
                <Memo
                  {...props}
                  memoInfo={memoInfo}
                  highlightsOnChange={sendHighlights}
                  memoOnchange={sendAddedMemo}
                  sendMemoState={sendMemoState}
                  editBtnClick={this.onEditedMemoSubmit}
                  submitBtnClick={this.onMemoSubmit}
                  postId={postId}
                  update={update}
                />
              )}
            />
            <Route
              exact
              path="/bookSearch"
              render={props => (
                <BookSearch
                  {...props}
                  books={books}
                  searchBtnClick={bookSearch}
                  bookClick={sendChosenBook}
                />
              )}
            />
            <Route
              exact
              path="/profile"
              render={props => (
                <Profile
                  {...props}
                  postInfo={postInfo}
                  postUserId={postUserId}
                  getUserProfile={getUserProfile}
                  profile={profile}
                  getUserMemos={getUserMemos}
                  memos={memos}
                  memoSearching={memoSearching}
                  getUserBooks={getUserBooks}
                  userBooks={userBooks}
                  getUserKeywords={getUserKeywords}
                  isMemoPage={isMemoPage}
                  navigateBtnClick={sendProfilePageState}
                />
              )}
            />
            <Route
              exact
              path="/profile/:user_id"
              render={props => (
                <Profile
                  {...props}
                  postInfo={postInfo}
                  postUserId={postUserId}
                  getUserProfile={getUserProfile}
                  getUserMemos={getUserMemos}
                  getUserBooks={getUserBooks}
                  userBooks={userBooks}
                  getUserKeywords={getUserKeywords}
                  isMemoPage={isMemoPage}
                  navigateBtnClick={sendProfilePageState}
                />
              )}
            />
            <Route
              exact
              path="/books/:bookTitle"
              render={props => (
                <BookPostDetails
                  {...props}
                  update={update}
                  sendAddedMemo={sendAddedMemo}
                  sendHighlights={sendHighlights}
                  getSelectedMemos={getSelectedMemos}
                  memos={memosWithBook}
                  bookInfo={chosenBookForMemos}
                  sendEditingState={sendEditingState}
                  sendChosenBook={sendChosenBook}
                  trashcanIconClick={this.deletePost}
                  sendPostId={sendPostId}
                />
              )}
            />
            {token
              && (
                <Navigation />
              )}
          </Fragment>
        )
    );
  }
}

const mapStateToProps = (state) => {
  let userBookPosts;
  let requiredInformation;
  const convertPostDate = (ISOdate) => {
    if (moment(ISOdate)._isValid) {
      let convertedDate;
      const date = moment(ISOdate);

      if (moment(date).format('YYYY') === moment().format('YYYY')) {
        if (moment(date).format('MMMM') === moment().format('MMMM')) {
          convertedDate = moment(date).fromNow();
        } else {
          convertedDate = moment(date).format('MMMM Do');
        }
      } else {
        convertedDate = moment(date).format('YYYY MMMM Do');
      }
      return convertedDate;
    }

    return ISOdate;
  };

  state.post.memos.forEach((memo) => {
    memo.createdAt = convertPostDate(memo.createdAt);
  });

  state.post.allMemos.forEach((memo) => {
    memo.createdAt = convertPostDate(memo.createdAt);
  });

  state.post.chosenBook.selectedBookMemos.forEach((memo) => {
    memo.createdAt = convertPostDate(memo.createdAt);
  });

  if (state.post.books.length) {
    userBookPosts = state.post.books.map(book => JSON.parse(book));
  } else {
    userBookPosts = state.post.books;
  }

  if (Object.keys(state.post.keywordSearchResults)) {
    requiredInformation = state.post.keywordSearchResults.map(user => ({
      name: user.name,
      _id: user._id,
      photoURL: user.photoURL,
    }));
  }

  return {
    loading: state.pageState.initiate,
    update: state.post.postUpdating,
    books: state.books,
    profile: state.post.profile,
    memos: state.post.memos,
    postId: state.post.postId,
    userBooks: userBookPosts,
    memoSearching: state.post.memoSearching,
    selectedBookMemos: state.post.selectedBookMemos,
    chosenBookForMemos: state.post.chosenBook.bookInfo,
    memosWithBook: state.post.chosenBook.selectedBookMemos,
    postInfo: state.post,
    memoInfo: state.memo,
    allMemos: state.post.allMemos,
    allMemosSearching: state.post.allMemosSearching,
    postUserId: state.post.postUserId,
    keywordSearchResults: requiredInformation,
    isMemoPage: state.pageState.isMemoPage,
  };
};

const mapDispatchToProps = dispatch => ({
  async bookSearch(keyword, page, isNewKeyword) {
    if (keyword && page) {
      const api = 'https://dapi.kakao.com/v3/search/book';
      const searchResponse = await axios.get(
        `${api}?query=${keyword}&size=20&page=${page}`, {
          headers: {
            Authorization: 'KakaoAK 80fbcd0a3e420c112690cb3a68ae4511',
          },
        },
      );

      dispatch(actions.sendBookData(keyword, page, isNewKeyword, searchResponse));
    }
  },
  sendChosenBook(img, title, author, publisher) {
    dispatch(actions.sendChosenBook(img, title, author, publisher));
  },
  sendAddedMemo(memo) {
    dispatch(actions.sendAddedMemo(memo));
  },
  sendProfilePageState(isMemo) {
    dispatch(actions.sendProfilePageState(isMemo));
  },
  sendMemoState(isPrivate) {
    dispatch(actions.sendMemoState(isPrivate));
  },
  sendEditingState(isNew) {
    dispatch(actions.sendEditingState(isNew));
  },
  sendHighlights(memo) {
    dispatch(actions.sendHighlights(memo));
  },
  sendLoadingState() {
    dispatch(actions.sendLoadingState());
  },
  sendPostId(postId) {
    dispatch(actions.sendPostId(postId));
  },
  async getKeywordsRelatedUsers(keyword) {
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';
    const keywordSearchResponse = await axios({
      method: 'get',
      url: `${api}/keywords/${keyword}/users`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (keywordSearchResponse.status === 200) {
      dispatch(actions.sendKeywordResults(keywordSearchResponse.data));
    }
  },
  async getUserBooks(updating, id) {
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';
    const userInfoResponse = await axios({
      method: 'get',
      url: `${api}/users/${id}/books`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    dispatch(actions.sendUserBooks(userInfoResponse.data, updating));
  },
  async getUserKeywords(id) {
    let userKeywordsResponse;
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';

    try {
      userKeywordsResponse = await axios({
        method: 'get',
        url: `${api}/users/${id}/keywords`,
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    } catch (err) {
      console.log(err);
    }

    dispatch(actions.sendUserKeywords(userKeywordsResponse.data));
  },
  async getUserProfile(id) {
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';
    const userInfoResponse = await axios({
      method: 'get',
      url: `${api}/users/${id}/userInfo`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    dispatch(actions.sendUserProfile(userInfoResponse.data, id));
  },
  async getAllMemos(page, isUpdate) {
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';
    const allMemosResponse = await axios({
      method: 'get',
      url: `${api}/posts/memos/${page}`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    dispatch(actions.sendAllMemos(allMemosResponse.data, isUpdate));
  },
  async getUserMemos(page, userId) {
    let id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';
    if (userId) {
      id = userId;
    }

    const userMemosResponse = await axios({
      method: 'get',
      url: `${api}/users/${id}/memos/${page}`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    dispatch(actions.sendUserMemos(userMemosResponse.data, page));
  },
  async getSelectedMemos(bookTitle, userId) {
    let memoRequestResponse;
    const token = localStorage.getItem('token');
    const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';
    try {
      memoRequestResponse = await axios({
        method: 'get',
        url: `${api}/users/${userId}/books/${bookTitle}/memos`,
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    } catch (err) {
      console.log(err);
    }

    dispatch(actions.sendSelectedMemos(memoRequestResponse.data.memos, memoRequestResponse.data.chosenBook));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
