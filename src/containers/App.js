import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Navigation from '../components/Navigation/Navigation';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Camera from '../components/Camera/Camera';
import BookSearch from '../components/BookSearch/BookSearch';
import Memo from '../components/Memo/Memo';
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
      sendAddedMemo,
      memo,
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
                <Camera {...props} />
              )}
            />
            <Route
              exact
              path="/memo"
              render={props => (
                <Memo
                  {...props}
                  memo={memo}
                  sendAddedMemo={sendAddedMemo}
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
            <Navigation />
          </Fragment>
        )
      // </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.initiate,
    books: state.books,
    chosenBook: state.memo.book,
    memo: state.memo.memo,
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
  sendAddedMemo(memo) {
    dispatch(actions.sendAddedMemo(memo));
  },
  sendChosenBook(img, title, author, publisher) {
    dispatch(actions.sendChosenBook(img, title, author, publisher));
  },
  sendLoadingState() {
    dispatch(actions.sendLoadingState());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
