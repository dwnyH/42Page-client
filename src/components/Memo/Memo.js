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
    const { memoInfo } = this.props;
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const api = 'http://192.168.0.81:8081';

    try {
      const memoSubmitResponse = await axios({
        method: 'post',
        url: `${api}/users/${id}/posts`,
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {
          isPrivate: memoInfo.isPrivate,
          addedMemo: memoInfo.memo,
          highlights: memoInfo.highlights,
          bookInfo: memoInfo.book,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.log(err);
    }
    //메모저장시 팝업 띄워주기
  }

  async onEditedMemoSubmit() {
    const { memoInfo, location } = this.props;
    const postId = location.data.postId;
    const token = localStorage.getItem('token');
    const api = 'http://192.168.0.81:8081';

    try {
      const memoSubmitResponse = await axios({
        method: 'put',
        url: `${api}/posts/${postId}`,
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {
          isPrivate: memoInfo.isPrivate,
          addedMemo: memoInfo.memo,
          highlights: memoInfo.highlights,
          bookInfo: memoInfo.book,
        },
      });
    } catch (err) {
      console.log(err);
    }
    //메모저장시 팝업 띄워주기
  }

  async trashcanIconClick(ev) {
    // const { deleteBtnClick } = this.props;
    const postId = ev.currentTarget.id;
    // deleteBtnClick(ev.currentTarget.id);
    const token = localStorage.getItem('token');
    const api = 'http://192.168.0.81:8081';
    const deleteRequestResponse = await axios({
      method: 'delete',
      url: `${api}/posts/${postId}`,
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      }
    });
    console.log('deleteResponse', deleteRequestResponse);
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
            memoInfo.highlights.length
              ? memoInfo.highlights
              : '먼 나라에 가보지 못했다. 그리고 나는 먼 나라에 가본 적 있는 사람과 터놓고 마음을 나눌 수 없는 이유를 아직도 잘은 모른다. 본 게 많고 들은 게 많고 맛본 게 많고, 하여 간 느낀 게 많은 사람은 그만큼이나 폭넓은 사유를 지니 게 된다는데, 나는 접한 게 많지 않아 이렇게도 쉽게 슬퍼 하고 기뻐하는 걸 반복하는 걸까. 그저 아는 게 많지 않아 서 그들과 어울리지 못하는 건지도 모르겠다 줄 짧은 추 의 진자운동을 볼 땐 그게 참 경박하면서도 서글퍼 보였'
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
          defaultValue={
            memoInfo.isNew
              ? '선택한 문장에 대한 메모를 남겨보세요 :)'
              : memoInfo.memo
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
