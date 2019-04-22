import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.userNameClick = this.userNameClick.bind(this);
  }

  componentDidMount() {
    const {
      getAllMemos,
      allMemos,
      history,
    } = this.props;
    let pageState;

    if (history.location.data) {
      pageState = history.location.data.pageState;
    }

    if (!allMemos.length || pageState) {
      if (pageState) {
        history.location.data.pageState = null;
        return getAllMemos(1, true);
      }

      getAllMemos(1);
    }

    window.addEventListener('scroll', this.debouncedScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedScroll);
  }

  userNameClick(ev) {
    const { history } = this.props;
    const id = ev.currentTarget.id;
    history.push({ pathname: `/profile/${id}` });
  }

  debouncedScroll() {
    const {
      getAllMemos,
      allMemosSearching,
      allMemos,
    } = this.props;
    const { memoPage } = this.state;

    if (allMemosSearching && allMemos.length) {
      if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 200)) {
        this.setState(prevState => ({
          memoPage: prevState.memoPage + 1,
        }), getAllMemos.bind(this, memoPage + 1));
      }
    }
  }

  makeAllMemoLists() {
    const { allMemos } = this.props;
    const memoLists = allMemos.map(memo => (
      <div className="memoPost" key={memo._id}>
        <button
          type="button"
          className="userInfo"
          onClick={this.userNameClick}
          id={memo.user_id._id}
        >
          <img src={memo.user_id.photoURL} alt="profileImage" />
          <div className="user">
            {memo.user_id.name.split(' ')[0]}
          </div>
        </button>
        <div className="highlights">
          {memo.highlights}
        </div>
        <div className="memoInfo">
          <div className="bookInfo">
            {memo.bookInfo.title}
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
    const { allMemos } = this.props;

    return (
      <div className="memoPosts">
        <div className="logoWrapper">
          <div className="logo">42 Page</div>
        </div>
        <div className="about" />
        {allMemos.length
          ? this.makeAllMemoLists()
          : '저장된 메모가 없습니다. 메모를 만들어보세요 :)'
        }
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  getAllMemos: PropTypes.func,
  allMemosSearching: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  allMemos: PropTypes.arrayOf(PropTypes.shape({
    user_id: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      photoURL: PropTypes.string,
    }),
    highlights: PropTypes.string,
    createdAt: PropTypes.string,
    bookInfo: PropTypes.shape({
      title: PropTypes.string,
    }),
  })),
};
