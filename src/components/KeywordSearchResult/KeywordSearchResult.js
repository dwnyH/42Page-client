import React, { Component } from 'react';
import './KeywordSearchResult.scss';

class KeywordSearchResult extends Component {
  constructor(props) {
    super(props);

    this.selectUser = this.selectUser.bind(this);
    this.makeUserLists = this.makeUserLists.bind(this);
  }

  selectUser(ev) {
    const { history } = this.props;
    const selectedUserId = ev.currentTarget.id;
    history.push({ pathname: `/profile/${selectedUserId}` });
  }

  makeUserLists(users) {
    const keywordResults = users.map(user => (
      <div className="userList" key={user._id} onClick={this.selectUser} id={user._id}>
        <img src={user.photoURL} alt="thumbnail" />
        <div className="name">{user.name.split(' ')[0]}</div>
      </div>
    ));

    return keywordResults;
  }

  render() {
    const { keywordSearchResults } = this.props;

    return (
      <div className="userLists">
        {keywordSearchResults.length
          ? this.makeUserLists(keywordSearchResults)
          : null
        }
      </div>
    );
  }
}

export default KeywordSearchResult;
