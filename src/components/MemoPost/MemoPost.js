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
    const {
      getUserMemos,
      id,
      match,
    } = this.props;
    // const id = match.params.user_id;
    // const userId = localStorage.getItem('id');
    debugger;
    getUserMemos(1, id);
    // if ((id === userId) && (!memos.length || update || postUserId !== userId)) {
    //   getUserMemos(1, id);
    // } else if (id !== userId) {
    //   getUserMemos(1, id);
    // }
  }

  // componentDidUpdate(prevProps) {
  //   debugger;
  //   const {
  //     postUserId,
  //     getUserMemos,
  //   } = this.props;
  //   if (postUserId !== prevProps.postUserId) {
  //     getUserMemos(1, postUserId);
  //   }
  // }

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
    const {
      memos,
      profile,
    } = this.props;

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
    const { memos, match, postUserId } = this.props;
    const id = match.params.user_id;

    return (
      <div className="memoPosts">
        {memos.length || id === postUserId
          ? this.makeMemoLists()
          : '저장한 메모가 없습니다. 메모를 만들어보세요 :)'
        }
      </div>
    );
  }
}

export default MemoPost;
