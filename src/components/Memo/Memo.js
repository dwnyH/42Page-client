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

    this.state = {
      isPrivate: false,
      addedMemo: '',
    };

    this.addMemo = this.addMemo.bind(this);
    this.onMemoSubmit = this.onMemoSubmit.bind(this);
    this.privateCheck = this.privateCheck.bind(this);
  }

  addMemo(ev) {
    const memo = ev.target.value;

    this.setState({
      addedMemo: memo,
    });
  }

  async onMemoSubmit() {
    const { highlights, chosenBook } = this.props;
    const { isPrivate, addedMemo } = this.state;
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
          isPrivate,
          addedMemo,
          highlights,
          bookInfo: chosenBook,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.log(err);
    }
    //메모저장시 팝업 띄워주기
  }

  privateCheck() {
    const { isPrivate } = this.state;

    this.setState({
      isPrivate: !isPrivate,
    });
  }

  render() {
    const { chosenBook, highlights } = this.props;
    const { isPrivate } = this.state;

    return (
      <div className="addMemo">
        <div className="highlights">
          {highlights.length
            ? highlights
            : '먼 나라에 가보지 못했다. 그리고 나는 먼 나라에 가본 적 있는 사람과 터놓고 마음을 나눌 수 없는 이유를 아직도 잘은 모른다. 본 게 많고 들은 게 많고 맛본 게 많고, 하여 간 느낀 게 많은 사람은 그만큼이나 폭넓은 사유를 지니 게 된다는데, 나는 접한 게 많지 않아 이렇게도 쉽게 슬퍼 하고 기뻐하는 걸 반복하는 걸까. 그저 아는 게 많지 않아 서 그들과 어울리지 못하는 건지도 모르겠다 줄 짧은 추 의 진자운동을 볼 땐 그게 참 경박하면서도 서글퍼 보였'
          }
        </div>
        <Link to="/bookSearch">
          <div className="bookSearch">
            {chosenBook.title.length
              ? chosenBook.title
              : '* 책 선택하기'
            }
          </div>
        </Link>
        <textarea
          className="memoTextarea"
          onChange={this.addMemo}
          placeholder="선택한 문장에 대한 메모를 남겨보세요 :)"
        />
        <div className="private">
          <Toggle
            defaultChecked={isPrivate}
            aria-label="Private"
            onChange={this.privateCheck}
          />
        </div>
        <div className="memo" onClick={this.onMemoSubmit}>
          memo
        </div>
      </div>
    );
  }
}

export default Memo;
