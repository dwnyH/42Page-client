import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    ;
    const id = localStorage.getItem('id');
    return (
      <div className="navigation">
        <Link to="/home"><i className="fas fa-book-open" /></Link>
        <Link to="/keywordSearch"><i className="fas fa-search" /></Link>
        <Link to="/camera"><i className="fas fa-camera-retro" /></Link>
        <Link to={{ pathname: `/profile` }}><i className="fas fa-user-circle" /></Link>
      </div>
    );
  }
}

export default Navigation;
