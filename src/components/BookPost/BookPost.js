import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookPost.scss';

class BookPost extends Component {
  constructor(props) {
    super(props);
    this.bookClicked = this.bookClicked.bind(this);
  }

  componentDidMount() {
    const { getUserBooks, id } = this.props;

    getUserBooks(false, id);
  }

  bookClicked(ev) {
    const { userBooks, history, id } = this.props;
    const selectedBook = userBooks[ev.currentTarget.id];

    history.push({
      pathname: `/books/${selectedBook.title}`,
      bookInfo: selectedBook,
      id,
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

BookPost.propTypes = {
  getUserBooks: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  userBooks: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    publisher: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
