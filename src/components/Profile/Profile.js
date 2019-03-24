import React, { Component, Fragment } from 'react';
import './Profile.scss';
import BookPost from '../BookPost/BookPost';
import MemoPost from '../MemoPost/MemoPost';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memoPage: true,
    };
    this.postingChange = this.postingChange.bind(this);
  }

  async componentDidMount() {
    const { profile, getUserProfile } = this.props;

    if (!profile.name.length) {
      getUserProfile();
    }
  }

  postingChange(ev) {
    if (ev.currentTarget.className === 'memoButton') {
      this.setState({
        memoPage: true,
      });
    } else {
      this.setState({
        memoPage: false,
      });
    }
  }

  render() {
    const { memoPage } = this.state;
    const {
      profile,
      getUserMemos,
      memos,
      userBooks,
      getUserBooks,
      memoSearching,
      deleteBtnClick,
      history,
    } = this.props;

    return (
      <Fragment>
      <div className="userMemoBackground" />
      <div className="profileBox">
        <div className="profile">
          <div className="userInfo">
            <img
              className="userImg"
              src={profile.imgSrc}
              alt="프로필사진"
            />
            <div className="userName">
              {profile.name}
            </div>
          </div>
          <div className="postInfo">
            <div className="postTotal">
              <div className="title">memo</div>
              <div className="total">{profile.memoTotal}</div>
            </div>
            <div className="bookTotal">
              <div className="title">book</div>
              <div className="total">{profile.bookTotal}</div>
            </div>
          </div>
        </div>
        <div className="profileNavi">
          <button
            type="submit"
            className="memoButton"
            onClick={this.postingChange}
          >
            <i className="fas fa-highlighter" />
          </button>
          <button
            type="submit"
            className="bookButton"
            onClick={this.postingChange}
          >
            <i className="fas fa-book-open" />
          </button>
        </div>
        {memoPage
          ? (
            <MemoPost
              getUserMemos={getUserMemos}
              memos={memos}
              profile={profile}
              memoSearching={memoSearching}
              deleteBtnClick={deleteBtnClick}
            />
          )
          : (
            <BookPost
              history={history}
              userBooks={userBooks}
              getUserBooks={getUserBooks}
            />
          )
        }
      </div>
      </Fragment>
    );
  }
}

export default Profile;
