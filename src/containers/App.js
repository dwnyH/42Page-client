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
      sendUserProfile,
      profile,
      sendUserMemos,
      memos,
      sendUserBooks,
      userBooks,
      memoSearching,
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
                <Camera {...props}
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
                  getUserProfile={sendUserProfile}
                  profile={profile}
                  getUserMemos={sendUserMemos}
                  memos={memos}
                  memoSearching={memoSearching}
                  getUserBooks={sendUserBooks}
                  userBooks={userBooks}
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

  return {
    loading: state.loading.initiate,
    books: state.books,
    chosenBook: state.memo.book,
    highlights: state.memo.highlights,
    profile: state.post.profile,
    memos: state.post.memos,
    userBooks: state.post.books,
    memoSearching: state.post.memoSearching,
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
  async sendUserBooks() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://192.168.0.81:8081';
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
  async sendUserProfile() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://192.168.0.81:8081';
    const userInfoResponse = await axios({
      method: 'get',
      url: `${api}/users/${id}/userInfo`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    dispatch(actions.sendUserProfile(userInfoResponse.data));
  },
  async sendUserMemos(page) {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://192.168.0.81:8081';
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
