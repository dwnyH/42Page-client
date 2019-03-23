import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import Navigation from '../components/Navigation/Navigation';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Camera from '../components/Camera/Camera';
import BookSearch from '../components/BookSearch/BookSearch';
import Memo from '../components/Memo/Memo';
import Profile from '../components/Profile/Profile';
import BookPostDetails from '../components/BookPostDetails/BookPostDetails';
import * as actions from '../actions';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { sendLoadingState, searchStop } = this.props;
    sendLoadingState();

    // if (!firebase.apps.length) {
    //   debugger;
    //   firebase.initializeApp(config);
    // }
  }

  render() {
    debugger;
    const token = localStorage.getItem('token');
    const {
      loading,
      books,
      bookSearch,
      sendChosenBook,
      chosenBook,
      sendHighlights,
      highlights,
      getUserProfile,
      profile,
      getUserMemos,
      memos,
      getUserBooks,
      userBooks,
      memoSearching,
      deleteMemos,
      getSelectedMemos,
      chosenBookForMemos,
      memosWithBook,
    } = this.props;

    return (
      // // <Router>
      // <Loding />
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
                  <Home {...props} />
                )
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
              path="/camera"
              render={props => (
                <Camera
                  {...props}
                  addMemoBtnClick={sendHighlights}
                />
              )}
            />
            <Route
              exact
              path="/memo"
              render={props => (
                <Memo
                  {...props}
                  highlights={highlights}
                  chosenBook={chosenBook}
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
                  getUserProfile={getUserProfile}
                  profile={profile}
                  getUserMemos={getUserMemos}
                  memos={memos}
                  memoSearching={memoSearching}
                  getUserBooks={getUserBooks}
                  userBooks={userBooks}
                />
              )}
            />
            <Route
              exact
              path="/books/:bookTitle"
              render={props => (
                <BookPostDetails
                  {...props}
                  getSelectedMemos={getSelectedMemos}
                  memos={memosWithBook}
                  bookInfo={chosenBookForMemos}
                  deleteBtnClick={deleteMemos}
                />
              )}
            />
            {token
              && (
                <Navigation />
              )}
          </Fragment>
        )
      // </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const convertPostDate = (date) => {
    let convertedDate;
    if (moment(date).format('YYYY') === moment().format('YYYY')) {
      if (moment(date).format('MMMM') === moment().format('MMMM')) {
        convertedDate = moment(date).fromNow();
      } else {
        convertedDate = moment(date).format('MMMM do');
      }
    } else {
      convertedDate = moment(date).format('YYYY MMMM Do');
    }
    return convertedDate;
  };

  state.post.memos.forEach((memo) => {
    memo.createdAt = convertPostDate(memo.createdAt);
  });

  state.post.chosenBook.selectedBookMemos.forEach((memo) => {
    memo.createdAt = convertPostDate(memo.createdAt);
  });

  return {
    loading: state.loading.initiate,
    books: state.books,
    chosenBook: state.memo.book,
    highlights: state.memo.highlights,
    profile: state.post.profile,
    memos: state.post.memos,
    userBooks: state.post.books,
    memoSearching: state.post.memoSearching,
    selectedBookMemos: state.post.selectedBookMemos,
    chosenBookForMemos: state.post.chosenBook.bookInfo,
    memosWithBook: state.post.chosenBook.selectedBookMemos,
  };
};

const mapDispatchToProps = dispatch => ({
  async bookSearch(keyword, page, isNewKeyword) {
    if (keyword && page) {
      const url = 'https://dapi.kakao.com/v3/search/book';
      const searchResponse = await axios.get(
        `${url}?query=${keyword}&size=20&page=${page}`, {
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
  sendHighlights(memo) {
    dispatch(actions.sendHighlights(memo));
  },
  sendLoadingState() {
    dispatch(actions.sendLoadingState());
  },
  async deleteMemos(postId) {
    const token = localStorage.getItem('token');
    const api = 'http://172.30.1.3:8081';
    const deleteRequestResponse = await axios({
      method: 'delete',
      url: `${api}/posts/${postId}`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    console.log('deleteResponse', deleteRequestResponse);
    // dispatch(actions.sendUserBooks(userInfoResponse.data));
  },
  async getUserBooks() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://172.30.1.3:8081';
    const userInfoResponse = await axios({
      method: 'get',
      url: `${api}/users/${id}/books`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    dispatch(actions.sendUserBooks(userInfoResponse.data));
  },
  async getUserProfile() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://172.30.1.3:8081';
    const userInfoResponse = await axios({
      method: 'get',
      url: `${api}/users/${id}/userInfo`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    debugger;
    dispatch(actions.sendUserProfile(userInfoResponse.data));
  },
  async getUserMemos(page) {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://172.30.1.3:8081';
    const userMemosResponse = await axios({
      method: 'get',
      url: `${api}/users/${id}/memos/${page}`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    dispatch(actions.sendUserMemos(userMemosResponse.data));
  },
  async getSelectedMemos(bookTitle) {
    debugger;
    let memoRequestResponse;
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://172.30.1.3:8081';
    try {
      memoRequestResponse = await axios({
        method: 'get',
        url: `${api}/users/${id}/books/${bookTitle}/memos`,
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    } catch (err) {
      console.log(err);
    }
    debugger;

    dispatch(actions.sendSelectedMemos(memoRequestResponse.data.memos, memoRequestResponse.data.chosenBook));

    // this.props.history.push({
    //   pathname: `./books/${bookInfo.title}`,
    //   // bookInfo: selectedBook,
    // });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
