import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import './BookSearchResult.scss';

class BookSearchResult extends Component {
  constructor(props) {
    super(props);

    this.chooseBook = this.chooseBook.bind(this);
    this.debouncedScroll = debounce(this.debouncedScroll.bind(this), 300);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.debouncedScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debouncedScroll);
  }

  chooseBook(ev) {
    const { bookClick, history } = this.props;
    const imgSrc = ev.currentTarget.children[0].src;
    const title = ev.currentTarget.children[1].children[0].innerText;
    const author = ev.currentTarget.children[1].children[1].innerText;
    const publisher = ev.currentTarget.children[1].children[2].innerText;

    bookClick(imgSrc, title, author, publisher);
    history.push('/memo');
  }

  debouncedScroll() {
    const {
      searchStop,
      keepSearch,
      page,
      keyword,
    } = this.props;

    if (!searchStop) {
      if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 500) && !searchStop) {
        const newPage = page + 1;
        keepSearch(keyword, newPage);
      }
    }
  }

  makeBookLists(books) {
    const bookResults = books.map((book, idx) => (
      <div className="bookList" key={idx} onClick={this.chooseBook}>
        <img src={book.thumbnail} alt="thumbnail" />
        <div className="bookContents">
          <div className="title">{book.title}</div>
          <div className="author">{book.authors}</div>
          <div className="publisher">{book.publisher}</div>
        </div>
      </div>
    ));

    return bookResults;
  }

  render() {
    const { books, searchStop } = this.props;

    return (
      <div className="bookSearchResult" onScroll={this.debouncedScroll}>
        {books.length
          ? this.makeBookLists(books)
          : null
        }
        {searchStop && '더 이상 검색결과가 없습니다.'}
      </div>
    );
  }
}

export default BookSearchResult;

BookSearchResult.propTypes = {
  searchStop: PropTypes.bool,
  bookClick: PropTypes.func,
  keepSearch: PropTypes.func,
  history: PropTypes.object,
  page: PropTypes.number,
  keyword: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.array,
    publisher: PropTypes.string,
  })),
};
