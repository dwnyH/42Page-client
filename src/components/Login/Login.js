import React, { Component, Fragment } from 'react';
import './Login.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../facebook_config';

class Login extends Component {
  constructor(props) {
    super(props);

    this.facebookLogin = this.facebookLogin.bind(this);
    this.facebookLogOut = this.facebookLogOut.bind(this);
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      debugger;
      firebase.initializeApp(config);
    }
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const { history } = this.props;

    firebase.auth().signInWithPopup(provider).then(async (result) => {
      if (result) {
        const { email, photoURL, uid } = result.user;
        const name = result.user.displayName;
        const url = 'http://172.30.1.21:8081';
        const jwtTokenResponse = await axios.post(`${url}/auth`, {
          name,
          email,
          photoURL,
          uid,
        });

        if (jwtTokenResponse.data) {
          const { token, id } = jwtTokenResponse.data;

          localStorage.setItem('token', token);
          localStorage.setItem('id', id);
          localStorage.token = jwtTokenResponse.token;

          history.push('/');
        }
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.setState({
        id: errorMessage,
      });
      window.alert(`error code: ${errorCode}, error message: ${errorMessage}`);
    });
  }

  facebookLogOut() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    }).catch((error) => {
      // An error happened.
    });
  }


  render() {
    return (
      <div className="loginBtn">
        <button
          className="facebook"
          type="submit"
          onClick={this.facebookLogin}
        >
          facebook login
        </button>
        <button
          type="submit"
          onClick={this.facebookLogOut}
        >logout
        </button>
      </div>
    );
  }
}

export default Login;
