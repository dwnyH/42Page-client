import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Memo.scss';
import 'firebase/auth';

class Memo extends Component {
  constructor(props) {
    super(props);

    this.addMemo = this.addMemo.bind(this);
    this.onMemoSubmit = this.onMemoSubmit.bind(this);
  }

  addMemo(ev) {
    const { sendAddedMemo } = this.props;
    const memo = ev.target.value;

    sendAddedMemo(memo);
  }

  onMemoSubmit() {
    debugger;
    
  }

  render() {
    // const { location.query.highlights } = this.props
    // this.props.location.query.highlights
    const { chosenBook, location } = this.props;

    return (
      <div className="addMemo">
        <div className="highlights">
          {location.query
            ? location.query.highlights
            : '먼 나라에 가보지 못했다. 그리고 나는 먼 나라에 가본 적 있는 사람과 터놓고 마음을 나눌 수 없는 이유를 아직도 잘은 모른다. 본 게 많고 들은 게 많고 맛본 게 많고, 하여 간 느낀 게 많은 사람은 그만큼이나 폭넓은 사유를 지니 게 된다는데, 나는 접한 게 많지 않아 이렇게도 쉽게 슬퍼 하고 기뻐하는 걸 반복하는 걸까. 그저 아는 게 많지 않아 서 그들과 어울리지 못하는 건지도 모르겠다 줄 짧은 추 의 진자운동을 볼 땐 그게 참 경박하면서도 서글퍼 보였'
          }
        </div>
        <Link to="/bookSearch">
          <div className="bookSearch">
            {chosenBook
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
        <div className="memo" onClick={this.onMemoSubmit}>
          memo
        </div>
      </div>
    );
  }
}

export default Memo;
