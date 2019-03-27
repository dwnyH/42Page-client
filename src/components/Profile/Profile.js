import React, { Component, Fragment } from 'react';
import './Profile.scss';
import Modal from '../Modal/Modal';
import BookPost from '../BookPost/BookPost';
import MemoPost from '../MemoPost/MemoPost';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memoPage: true,
      isModalOpen: false,
    };
    this.postingChange = this.postingChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  closeModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  showModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  render() {
    const { memoPage, isModalOpen } = this.state;
    const {
      postInfo,
      profile,
      getUserMemos,
      memos,
      userBooks,
      getUserBooks,
      memoSearching,
      deleteBtnClick,
      history,
      getUserKeywords,
    } = this.props;

    return (
      <Fragment>
        {
          isModalOpen
            && (
              <Modal
                keywords={postInfo.keywords}
                backgroundClick={this.closeModal}
                getUserKeywords={getUserKeywords}
              />
            )
        }
        <div className="profileBox">
        <div className="profile">
          <div className="userInfo">
            <img
              className="userImg"
              src={profile.imgSrc}
              alt="profileImg"
            />
            <div className="userName">
              {profile.name}
            </div>
          </div>
          <div className="keywordInfo">
            <button className="keywordBtn" type="button" onClick={this.showModal}>
              {profile.name.split(' ')[0]}'s keyword
            </button>
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
      </Fragment>
    );
  }
}

export default Profile;
