import React, { Component } from 'react';
import { debounce } from 'lodash';
import './BookPost.scss';

class BookPost extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getUserBooks, userBooks } = this.props;

    if (!userBooks.legnth) {
      getUserBooks();
    }
  }

  makeBookPosts() {
    const { userBooks } = this.props;

    const bookPostLists = userBooks.map((book, idx) => (
      <div className="bookList" key={idx}>
        <img src={book.img} alt="thumbnail" />
        <div className="bookContents">
          <div className="title">{book.title}</div>
          <div className="author">{book.authors}</div>
          <div className="publisher">{book.publisher}</div>
        </div>
      </div>
    ));

    return bookPostLists;
  }

  render() {
    const { userBooks } = this.props;

    return (
      <div className="bookPosts">
        {
          userBooks.length
            && this.makeBookPosts()
        }
      </div>
    );
  }
}

export default BookPost;
