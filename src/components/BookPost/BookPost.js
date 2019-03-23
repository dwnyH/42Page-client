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

    this.bookClicked = this.bookClicked.bind(this);
  }

  bookClicked(ev) {
    const { userBooks, history } = this.props;
    debugger;
    const selectedBook = userBooks[ev.currentTarget.id];

    history.push({
      pathname: `./books/${selectedBook.title}`,
      bookInfo: selectedBook,
    });
  }

  makeBookPosts() {
    const { userBooks } = this.props;

    const bookPostLists = userBooks.map((book, idx) => (
      <div className="bookList" key={idx} id={idx} onClick={this.bookClicked}>
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
