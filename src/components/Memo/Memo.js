import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
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
    debugger;
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
      history,
    } = this.props;
    const {
      book,
      highlights,
      memo,
      isPrivate,
    } = memoInfo;

    submitBtnClick(isPrivate, memo, highlights, book);
    debugger;
    // history.push('/home');
  }

  onEditBtnClick() {
    debugger;
    const {
      memoInfo,
      editBtnClick,
      postId,
      history,
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
      <div className="addMemo">
        <textarea
          className="highlights"
          onChange={this.changeHighlightInput}
          defaultValue={
            memoInfo.highlights
            && memoInfo.highlights
          }
        />
        <Link to="/bookSearch">
          <div className="bookSearch">
            {memoInfo.book.title.length
              ? memoInfo.book.title
              : '*(필수) 책 선택하기'
            }
          </div>
        </Link>
        <textarea
          className="memoTextarea"
          onChange={this.changeMemoInput}
          placeholder="선택한 문장에 대한 메모를 남겨보세요 :)"
          defaultValue={
            !memoInfo.isNew
              ? memoInfo.memo
              : ''
          }
        />
        <div className="private">
          <Toggle
            defaultChecked={memoInfo.isPrivate}
            aria-label="Private"
            onChange={this.privateCheck}
          />
        </div>
        {
          memoInfo.isNew
            ? (
              <button className="memo" onClick={this.onSubmitBtnClick} type="submit">
                memo
              </button>
            )
            : (
              <button className="edit" onClick={this.onEditBtnClick} type="submit">
                edit
              </button>
            )
        }
      </div>
    );
  }
}

export default Memo;
