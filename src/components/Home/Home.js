import React, { Component } from 'react';
import { debounce } from 'lodash';
import './Home.scss';
import 'firebase/auth';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memoPage: 1,
    };
    this.debouncedScroll = debounce(this.debouncedScroll.bind(this), 300);
    this.makeAllMemoLists = this.makeAllMemoLists.bind(this);
  }

  componentDidMount() {
    const {
      getAllMemos,
      allMemos,
    } = this.props;
    const { memoPage } = this.state;

    if (!allMemos.length) {
      getAllMemos(memoPage);
    }

    window.addEventListener('scroll', this.debouncedScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedScroll);
  }

  debouncedScroll() {
    const {
      getAllMemos,
      allMemosSearching,
    } = this.props;
    const { memoPage } = this.state;

    if (allMemosSearching) {
      if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 200)) {
        this.setState(prevState => ({
          memoPage: prevState.memoPage + 1,
        }), getAllMemos.bind(this, memoPage + 1));
      }
    }
  }

  makeAllMemoLists() {
    debugger;
    const { allMemos } = this.props;
    const memoLists = allMemos.map(memo => (
      <div className="memoPost" key={memo._id}>
        <div className="userInfo">
          <img src={memo.user_id.photoURL} alt="profileImage"/>
          <div className="user">
            {memo.user_id.name}
          </div>
        </div>
        <div className="highlights">
          {memo.highlights}
        </div>
        <div className="memoInfo">
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
      </div>
    ));

    return memoLists;
  }

  render() {
    debugger;
    const { allMemos } = this.props;

    return (
      <div className="memoPosts">
        {/* <div className="userMemoBackground" /> */}
        {allMemos.length
          ? this.makeAllMemoLists()
          : '저장된 메모가 없습니다. 메모를 만들어보세요 :)'
        }
      </div>
    );
  }
}

export default Home;
