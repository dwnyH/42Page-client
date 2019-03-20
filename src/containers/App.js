import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import Navigation from '../components/Navigation/Navigation';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Camera from '../components/Camera/Camera';
import * as actions from '../actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { sendLoadingState } = this.props;
    sendLoadingState();

    // if (!firebase.apps.length) {
    //   debugger;
    //   firebase.initializeApp(config);
    // }
  }

  render() {
    debugger;
    const token = localStorage.getItem('token');
    const { loading } = this.props;

    return (
      // // <Router>
      // <Loding />
      loading
        ? (
          <div className="loading">
            <i className="fas fa-leaf" />
          </div>
        )
        : (
          <Fragment>
            <Route
              exact
              path="/"
              render={props => (
                !token ? (
                  <Redirect from="/" to="/login" />
                ) : (
                  <Home {...props} />
                )
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} />
              )}
            />
            <Route
              exact
              path="/camera"
              render={props => (
                <Camera {...props} />
              )}
            />
            <Navigation />
          </Fragment>
        )
      // </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  sendLoadingState() {
    dispatch(actions.sendLoadingState());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// export default withRouter(App);
