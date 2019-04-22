import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default withRouter(ScrollToTop);

ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.object,
};
