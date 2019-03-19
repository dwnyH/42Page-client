import React, { Component } from 'react';
import './Home.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Header">
        홈
      </div>
    );
  }
}

export default Home;
