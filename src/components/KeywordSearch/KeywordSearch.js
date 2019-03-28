import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        debugger;
      onSubmit(input);
    }
  }

  enterKeyPress(ev) {
    this.debouncedKeyPress(ev.key);
  }

  submitBtnClick() {
    const { onSubmit } = this.props;
    const { input } = this.state;

    onSubmit(input);
  }

  render() {
    const { keywordSearchResults, history } = this.props;

    return (
      <div className="keywordSearch">
        <div className="searchBox">
          <input
            className="search"
            onChange={this.onInputChange}
            onKeyPress={this.enterKeyPress}
          />
          <button type="submit" onClick={this.submitBtnClick}>search</button>
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
