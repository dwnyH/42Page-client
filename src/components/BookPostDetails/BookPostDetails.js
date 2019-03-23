import React, { Component } from 'react';
import './BookPostDetails.scss';
import 'firebase/auth';

class BookPostDetails extends Component {
  constructor(props) {
    super(props);

    this.trashcanIconClick = this.trashcanIconClick.bind(this);
  }

  componentDidMount() {
    const { getSelectedMemos, bookInfo, match } = this.props;
    debugger;
    if (!Object.keys(bookInfo).length) {
      getSelectedMemos(match.params.bookTitle);
    } else if (match.params.bookTitle !== bookInfo.title) {
      getSelectedMemos(match.params.bookTitle);
    }
  }

  trashcanIconClick(ev) {
    const { deleteBtnClick } = this.props;
    console.log(ev.currentTarget.id);
    deleteBtnClick(ev.currentTarget.id);
  }

  makeMemoLists() {
    const { bookInfo, memos } = this.props;

    const memoList = memos.map(memo => (
      <div className="memoPost" key={memo._id}>
        <button className="edit" type="submit" id={memo._id}>
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
