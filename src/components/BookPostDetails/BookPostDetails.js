import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookPostDetails.scss';

class BookPostDetails extends Component {
  constructor(props) {
    super(props);

    this.trashcanIconClick = this.trashcanIconClick.bind(this);
    this.penIconClick = this.penIconClick.bind(this);
  }

  trashcanIconClick(ev) {
    const { trashcanIconClick } = this.props;
    const postId = ev.currentTarget.id;

    trashcanIconClick(postId);
  }

  componentDidMount() {
    const { getSelectedMemos, match, history } = this.props;
    const { bookTitle } = match.params;
    const { id } = history.location;

    getSelectedMemos(bookTitle, id);
  }

  penIconClick(ev) {
    const {
      history,
      memos,
      sendAddedMemo,
      sendHighlights,
      sendEditingState,
      sendChosenBook,
      sendPostId,
    } = this.props;
    const postId = ev.currentTarget.id.split(':')[0];
    const index = Number(ev.currentTarget.id.split(':')[1]);
    const memoInfo = memos[index];
    const {
      img,
      title,
      author,
      publisher,
    } = memoInfo.bookInfo;

    sendAddedMemo(memoInfo.addedMemo);
    sendHighlights(memoInfo.highlights);
    sendChosenBook(img, title, author, publisher);
    sendEditingState(false);

    sendPostId(postId);
    history.push('/memo');
  }

  makeMemoLists() {
    const { memos, history } = this.props;
    const userId = localStorage.getItem('id');

    const memoList = memos.map((memo, idx) => (
      <div className="bookPost" key={memo._id}>
        {
          history.location.id === userId
            && (
            <div className="buttons">
              <button className="edit" onClick={this.penIconClick} type="submit" id={`${memo._id}:${idx}`}>
                <i className="fas fa-pen-square" />
              </button>
              <button className="delete" onClick={this.trashcanIconClick} type="submit" id={memo._id}>
                <i className="fas fa-trash" />
              </button>
            </div>
            )
        }
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

BookPostDetails.propTypes = {
  trashcanIconClick: PropTypes.func,
  img: PropTypes.string,
  getSelectedMemos: PropTypes.func,
  history: PropTypes.shape({
    location: PropTypes.shape({
      id: PropTypes.string,
    })
  }),
  memos: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    highlights: PropTypes.string,
    bookInfo: PropTypes.shape({
      title: PropTypes.string,
    }),
    addedMemo: PropTypes.string,
    createdAt: PropTypes.string,
  })),
  sendAddedMemo: PropTypes.func,
  sendHighlights: PropTypes.func,
  sendEditingState: PropTypes.func,
  sendChosenBook: PropTypes.func,
  sendPostId: PropTypes.func,
  bookInfo: PropTypes.object,
};
