import React, { Component } from 'react';
import { debounce } from 'lodash';
import './KeywordSearchResult.scss';

class KeywordSearchResult extends Component {
  constructor(props) {
    super(props);

    this.selectUser = this.selectUser.bind(this);
    this.makeUserLists = this.makeUserLists.bind(this);
  }

  selectUser(ev) {
    debugger;
    const { history } = this.props;
    const selectedUserId = ev.currentTarget.id;
    history.push({ pathname: `/profile/${selectedUserId}` });
    // const { bookClick, history } = this.props;
    // const imgSrc = ev.currentTarget.children[0].src;
    // const title = ev.currentTarget.children[1].children[0].innerText;
    // const author = ev.currentTarget.children[1].children[1].innerText;
    // const publisher = ev.currentTarget.children[1].children[2].innerText;

    // bookClick(imgSrc, title, author, publisher);
    // history.push('/memo');
  }

  makeUserLists(users) {
    debugger;
    const keywordResults = users.map(user => (
      <div className="userList" key={user._id} onClick={this.selectUser} id={user._id}>
        <img src={user.photoURL} alt="thumbnail" />
        <div className="name">{user.name}</div>
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
          : '리서치결과'
        }
      </div>
    );
  }
}

export default KeywordSearchResult;
