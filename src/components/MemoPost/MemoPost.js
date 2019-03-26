import React, { Component } from 'react';
import { debounce } from 'lodash';
import './MemoPost.scss';

class MemoPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memoPage: 1,
    };
    this.debouncedScroll = debounce(this.debouncedScroll.bind(this), 300);
  }

  componentDidMount() {
    const { getUserMemos, memos } = this.props;
    const { memoPage } = this.state;

    if (!memos.length) {
      getUserMemos(memoPage);
    }

    window.addEventListener('scroll', this.debouncedScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedScroll);
  }

  debouncedScroll() {
    const {
      getUserMemos,
      memoSearching,
    } = this.props;

    if (memoSearching) {
      const { memoPage } = this.state;
      if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 200)) {
        this.setState(prevState => ({
          memoPage: prevState.memoPage + 1,
        }), getUserMemos.bind(this, memoPage + 1));
      }
    }
  }

  makeMemoLists() {
    const { memos, profile } = this.props;
    const memoLists = memos.map(memo => (
      <div className="memoPost" key={memo._id}>
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
          <div className="user">
            {profile.name}
          </div>
        </div>
      </div>
    ));

    return memoLists;
  }

  render() {
    const { memos } = this.props;

    return (
      <div className="memoPosts">
        {/* <div className="background" /> */}
        {memos.length
          ? this.makeMemoLists()
          : '저장한 메모가 없습니다. 메모를 만들어보세요 :)'
        }
      </div>
    );
  }
}

export default MemoPost;
