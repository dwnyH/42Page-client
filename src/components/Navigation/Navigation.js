import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    debugger;
    return (
      <div className="navigation">
        <i className="fas fa-book-open" />
        <i className="fas fa-search" />
        <Link to="/camera"><i className="fas fa-camera-retro" /></Link>
        <Link to="/profile"><i className="fas fa-user-circle" /></Link>
      </div>
    );
  }
}

export default Navigation;
