import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-toggle/style.css';
import './Memo.scss';
import 'firebase/auth';

class Memo extends Component {
  constructor(props) {
    super(props);

    this.changeMemoInput = this.changeMemoInput.bind(this);
    this.changeHighlightInput = this.changeHighlightInput.bind(this);
    this.privateCheck = this.privateCheck.bind(this);
    this.onEditBtnClick = this.onEditBtnClick.bind(this);
    this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
    this.memoId = '';
  }

  componentDidMount() {
    const { history } = this.props;
    if (history.location.data) {
      this.memoId = history.location.data.postId;
    }
  }

  changeMemoInput(ev) {
    const { memoOnchange } = this.props;
    const memo = ev.target.value;

    memoOnchange(memo);
  }

  changeHighlightInput(ev) {
    const { highlightsOnChange } = this.props;
    const highlights = ev.target.value;

    highlightsOnChange(highlights);
  }

  privateCheck() {
    const {
      sendMemoState,
      memoInfo,
    } = this.props;

    sendMemoState(!memoInfo.isPrivate);
  }

  onSubmitBtnClick() {
    const {
      memoInfo,
      submitBtnClick,
    } = this.props;
    const {
      book,
      highlights,
      memo,
      isPrivate,
    } = memoInfo;

    submitBtnClick(isPrivate, memo, highlights, book);
  }

  onEditBtnClick() {
    const {
      memoInfo,
      editBtnClick,
      postId,
    } = this.props;
    const {
      book,
      highlights,
      memo,
      isPrivate,
    } = memoInfo;

    editBtnClick(isPrivate, memo, highlights, book, postId);
  }

  render() {
    const {
      memoInfo,
    } = this.props;

    return (
      <div className="addMemo userInputContainer">
        <div className="notice">Book Information & Memo</div>
        <textarea
          className="userInput"
          onChange={this.changeHighlightInput}
          defaultValue={
            memoInfo.highlights
            && memoInfo.highlights
          }
        />
        <Link to="/bookSearch">
          <div className="bookSearch greenbtn">
            {memoInfo.book.title.length
              ? memoInfo.book.title
              : 'Enter book title'
            }
          </div>
        </Link>
        <textarea
          className="userInput"
          onChange={this.changeMemoInput}
          placeholder="선택한 문장에 대한 메모를 남겨보세요 :)"
          defaultValue={
            !memoInfo.isNew
              ? memoInfo.memo
              : ''
          }
        />
        {
          memoInfo.isNew
            ? (
              <button className="memo greenbtn" onClick={this.onSubmitBtnClick} type="submit">
                Memo
              </button>
            )
            : (
              <button className="edit greenbtn" onClick={this.onEditBtnClick} type="submit">
                edit
              </button>
            )
        }
      </div>
    );
  }
}

export default Memo;
