import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WordCloud from 'wordcloud';
import './Modal.scss';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { getUserKeywords, keywords, userId } = this.props;

    getUserKeywords(userId);

    if (Object.keys(keywords).length) {
      this.makeKeywordLists(keywords);
    }
  }

  componentDidUpdate(prevProps) {
    const { keywords } = this.props;
    if (keywords !== prevProps.keywords && Object.keys(keywords).length) {
      this.makeKeywordLists(keywords);
    }
  }

  makeKeywordLists(allKeywords) {
    WordCloud.minFontSize = '15px';
    WordCloud(this.canvasRef.current, {
      list: allKeywords,
      backgroundColor: '#000000',
      fontFamily: 'Noto Serif KR, serif',
      weightFactor: 10,
      gridSize: 5,
      fontCSS: 'https://fonts.googleapis.com/css?family=Noto+Serif+KR:400',
      color: () => {
        const colors = ['#FCD594', '#E06656', '#B5558A', '#5F426E', '#A1A2AA', '#7E8A81'];
        return colors[Math.floor(Math.random() * 6)];
      },
    });
  }

  render() {
    const { backgroundClick } = this.props;

    return (
      <div className="modalBox" onClick={backgroundClick}>
        <div className="modalContents">
          <canvas ref={this.canvasRef} width={400} height={400} />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  getUserKeywords: PropTypes.func,
  keywords: PropTypes.array,
  userId: PropTypes.string,
  backgroundClick: PropTypes.func,
};
