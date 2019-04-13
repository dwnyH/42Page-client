import React, { Component, Fragment } from 'react';
import './Profile.scss';
import Modal from '../Modal/Modal';
import BookPost from '../BookPost/BookPost';
import MemoPost from '../MemoPost/MemoPost';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
    this.postingChange = this.postingChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const { getUserProfile, getUserMemos, getUserBooks, match } = this.props;
    let id;

    if (match.params.user_id) {
      id = match.params.user_id;
      getUserMemos(1, id);
      getUserBooks(false, id);
    } else {
      id = localStorage.getItem('id');
      getUserMemos(1, id);
      getUserBooks(false, id);
    }

    getUserProfile(id);
  }

  postingChange(ev) {
    const { navigateBtnClick } = this.props;
    if (ev.currentTarget.className === 'memoButton') {
      navigateBtnClick(true);
    } else {
      navigateBtnClick(false);
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
    const { isModalOpen } = this.state;
    const {
      postInfo,
      getUserMemos,
      userBooks,
      getUserBooks,
      deleteBtnClick,
      history,
      getUserKeywords,
      match,
      isMemoPage,
    } = this.props;
    let id;
    let name;

    if (match.params.user_id) {
      id = match.params.user_id;
    } else {
      id = localStorage.getItem('id');
    }
    if (postInfo.profile.name.length) {
      name = `${postInfo.profile.name.split(' ')[0]}'s keyword`;
    }

    return (
      <Fragment>
        {
          isModalOpen
            && (
              <Modal
                keywords={postInfo.keywords}
                backgroundClick={this.closeModal}
                getUserKeywords={getUserKeywords}
                userId={id}
              />
            )
        }
        <div className="profileBox">
          <div className="profile">
            <div className="userInfo">
              <img
                className="userImg"
                src={postInfo.profile.imgSrc}
                alt="profileImg"
              />
              <div className="userName">
                {postInfo.profile.name.split(' ')[0]}
              </div>
            </div>
            <div className="keywordInfo">
              <button className="keywordBtn" type="button" onClick={this.showModal}>
                {name}
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
        {isMemoPage
          ? (
            <MemoPost
              match={match}
              update={postInfo.postUpdating}
              getUserMemos={getUserMemos}
              memos={postInfo.memos}
              profile={postInfo.profile}
              memoSearching={postInfo.memoSearching}
              deleteBtnClick={deleteBtnClick}
              id={id}
            />
          )
          : (
            <BookPost
              history={history}
              userBooks={userBooks}
              getUserBooks={getUserBooks}
              id={id}
            />
          )
        }
      </Fragment>
    );
  }
}

export default Profile;
