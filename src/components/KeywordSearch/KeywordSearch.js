import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KeywordSearchResult from '../KeywordSearchResult/KeywordSearchResult';
import './KeywordSearch.scss';

class KeywordSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.debouncedKeyPress = this.debouncedKeyPress.bind(this);
    this.enterKeyPress = this.enterKeyPress.bind(this);
    this.searchBtnClick = this.searchBtnClick.bind(this);
  }

  onInputChange(ev) {
    const text = ev.target.value;

    this.setState({
      input: text,
    });
  }

  debouncedKeyPress(key) {
    const { onSubmit } = this.props;
    const { input } = this.state;

    if (key === 'Enter') {
      onSubmit(input);
    }
  }

  enterKeyPress(ev) {
    this.debouncedKeyPress(ev.key);
  }

  searchBtnClick() {
    const { onSubmit } = this.props;
    const { input } = this.state;

    onSubmit(input);
  }

  render() {
    const { keywordSearchResults, history } = this.props;

    return (
      <div className="keywordSearch">
        <div className="notice">Keyword Search</div>
        <div className="searchBox">
          <input
            className="search userInput"
            onChange={this.onInputChange}
            onKeyPress={this.enterKeyPress}
          />
          <button className="greenbtn" type="submit" onClick={this.searchBtnClick}>search</button>
        </div>
        <KeywordSearchResult
          history={history}
          keywordSearchResults={keywordSearchResults}
        />
      </div>
    );
  }
}

export default KeywordSearch;

KeywordSearch.propTypes = {
  onSubmit: PropTypes.func,
  keywordSearchResults: PropTypes.array,
  history: PropTypes.object,
};
