import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import axios from 'axios';
import 'react-toggle/style.css';
import './Memo.scss';
import 'firebase/auth';

class Memo extends Component {
  constructor(props) {
    super(props);

    this.changeMemoInput = this.changeMemoInput.bind(this);
    this.changeHighlightInput = this.changeHighlightInput.bind(this);
    this.onMemoSubmit = this.onMemoSubmit.bind(this);
    this.onEditedMemoSubmit = this.onEditedMemoSubmit.bind(this);
    this.privateCheck = this.privateCheck.bind(this);
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

  async onMemoSubmit() {
    const { memoInfo, history } = this.props;
    const { book, highlights, memo, isPrivate } = memoInfo;

    if (!book.title.length || !highlights.length) {
      return alert('책 또는 하이라이트 정보를 반드시 입력해주세요 :)');
    }

    let memoSubmitResponse;
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://172.30.1.5:8081';

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
    //메모저장시 팝업 띄워주기
    if (memoSubmitResponse.status === 201) {
      history.push('/home');
    }
  }

  async onEditedMemoSubmit() {
    debugger;
    let memoSubmitResponse;
    const { memoInfo, location, history } = this.props;
    const { book, highlights, memo, isPrivate } = memoInfo;

    if (!book.title.length || !highlights.length) {
      return alert('책 또는 하이라이트 정보를 반드시 입력해주세요 :)');
    }

    const postId = location.data.postId;
    const token = localStorage.getItem('token');
    const api = 'http://172.30.1.5:8081';

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
    //메모저장시 팝업 띄워주
    if (memoSubmitResponse.status === 201) {
      history.push('/home');
    }
  }

  privateCheck() {
    debugger;
    const { sendMemoState, memoInfo } = this.props;
    sendMemoState(!memoInfo.isPrivate);
  }

  render() {
    const { memoInfo } = this.props;

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
        {/* </input> */}
        <Link to="/bookSearch">
          <div className="bookSearch">
            {memoInfo.book.title.length
              ? memoInfo.book.title
              : '* 책 선택하기'
            }
          </div>
        </Link>
        <textarea
          className="memoTextarea"
          onChange={this.changeMemoInput}
          placeholder="선택한 문장에 대한 메모를 남겨보세요 :)"
          defaultValue={
            memoInfo.isNew
              && memoInfo.memo
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
              <button className="memo" onClick={this.onMemoSubmit} type="submit">
                memo
              </button>
            )
            : (
              <button className="edit" onClick={this.onEditedMemoSubmit} type="submit">
                edit
              </button>
            )
        }
      </div>
    );
  }
}

export default Memo;
