import React, { Component } from 'react';
import axios from 'axios';
import './BookPostDetails.scss';
// import 'firebase/auth';

class BookPostDetails extends Component {
  constructor(props) {
    super(props);

    this.trashcanIconClick = this.trashcanIconClick.bind(this);
    this.penIconClick = this.penIconClick.bind(this);
  }

  componentDidMount() {
    const { getSelectedMemos, bookInfo, match } = this.props;

    if (!Object.keys(bookInfo).length) {
      getSelectedMemos(match.params.bookTitle);
    } else if (match.params.bookTitle !== bookInfo.title) {
      getSelectedMemos(match.params.bookTitle);
    }
  }

  penIconClick(ev) {
    const {
      history,
      memos,
      sendAddedMemo,
      sendHighlights,
      sendEditingState,
      sendChosenBook,
    } = this.props;
    const postId = ev.currentTarget.id.split(':')[0];
    const index = Number(ev.currentTarget.id.split(':')[1]);
    const memoInfo = memos[index];
    const { img, title, author, publisher } = memoInfo.bookInfo;

    sendAddedMemo(memoInfo.addedMemo);
    sendHighlights(memoInfo.highlights);
    sendChosenBook(img, title, author, publisher);
    sendEditingState(false);

    history.push({
      pathname: '/memo',
      data: { postId },
    });
  }

  async trashcanIconClick(ev) {
    let deleteRequestResponse;
    const { history } = this.props;
    const postId = ev.currentTarget.id;
    // deleteBtnClick(ev.currentTarget.id);
    const token = localStorage.getItem('token');
    const api = 'http://192.168.0.81:8081';
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
      history.push('/home');
    }
  }

  makeMemoLists() {
    const { memos } = this.props;
    debugger;
    const memoList = memos.map((memo, idx) => (
      <div className="memoPost" key={memo._id}>
        <button className="edit" onClick={this.penIconClick} type="submit" id={`${memo._id}:${idx}`}>
          <i className="fas fa-pen-square" />
        </button>
        <button className="delete" onClick={this.trashcanIconClick} type="submit" id={memo._id}>
          <i className="fas fa-trash" />
        </button>
        <div className="highlights">
          {memo.highlights}
        </div>
        <div className="bookInfo">
          {memo.bookInfo.title}
        </div>
        <div className="addedMemo">
          {memo.addedMemo}
        </div>
        <div className="createdAt">
          {memo.createdAt}
        </div>
      </div>
    ));

    return memoList;
  }

  render() {
    let style;
    const { bookInfo, memos } = this.props;
    if (Object.keys(bookInfo).length) {
      style = {
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: `url(${bookInfo.img})`,
        width: '100vw',
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: -10,
        position: 'absolute',
        filter: 'blur(5px)',
      };
    }

    return (
      <div className="bookPostDetails">
        <div
          className="background"
          style={style}
        />
        <div className="memoPosts">
          {(Object.keys(bookInfo).length && memos.length)
            ? this.makeMemoLists()
            : null
          }
        </div>
      </div>
    );
  }
}

export default BookPostDetails;
