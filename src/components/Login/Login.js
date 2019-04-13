import React, { Component } from 'react';
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
        const api = 'https://42pageBookmemo-env.kswdgdhrrz.ap-northeast-2.elasticbeanstalk.com';
        const jwtTokenResponse = await axios.post(`${api}/auth`, {
          name,
          email,
          photoURL,
          uid,
        });

        if (jwtTokenResponse.data) {
          const { token, id } = jwtTokenResponse.data;
          localStorage.setItem('token', token);
          localStorage.setItem('id', id);

          history.push('/');
        }
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      window.alert(`error code: ${errorCode}, error message: ${errorMessage}`);
    });
  }

  facebookLogOut() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    }).catch((error) => {
      console.log(error);
    });
  }


  render() {
    return (
      <div className="loginPage">
        <div className="title">42 Page</div>
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
      </div>
    );
  }
}

export default Login;
