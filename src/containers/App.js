import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import './App.css';
import config from '../facebook_config';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      debugger;
      firebase.initializeApp(config);
    }
  }

  render() {
    const token = localStorage.getItem('token');
    return (
      <Router>
        <Fragment>
          <Route
            exact
            path="/"
            render={props => (props.match.path === '/' && !token)
              && <Redirect from="/" to="/login" />
            }
          />
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login {...props} />
            )}
          />
          <Route exact path="/" />
        </Fragment>
      </Router>
    );
  }
}

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (state) => {

// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
