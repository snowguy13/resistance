import './login.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Input from '../ui/input';
import Button from '../ui/button';

import { setContainer } from '../../actions/all';
import { logInAsync } from '../../actions/auth';
import { LOGIN } from '../../constants/container-types';

class Login extends Component {
  static displayName = 'Login'

  static propTypes = {
    pendingAttempt: PropTypes.bool,
    logIn: PropTypes.func,
  }

  state = {
    name: '',
    pass: ''
  }

  canLogIn = () => {
    return !this.props.pendingAttempt && !!this.state.name && !!this.state.pass;
  }

  logIn = () => {
    console.log(`Logging in as '${this.state.name}', password is ${this.state.pass}`);

    // Send the log in request.
    this.props.logIn({
      name: this.state.name,
      pass: this.state.pass
    });
  }

  onInput = ( whichInput ) => ( newValue ) => {
    this.setState({
      [whichInput]: newValue,
    });
  }

  onKeyDown = ( key ) => {
    // If [Enter] and all authentication conditions are met...
    if( key == 13 ) {
      if( this.canLogIn() ) {
        // ... authenticate!
        this.logIn();
      }
    }
  }

  render() {
    const authDisabled = !this.canLogIn();
    const {
      logIn,
      props: { pendingAttempt }
    } = this;

    return (
      <div className="Login">
        <div className="Login__Message">
          Please identify yourself.
        </div>
        <Input
          name="Login__AgentID"
          label="Agent ID"
          onInput={ this.onInput('name') }
          onKeyDown={ this.onKeyDown } />
        <Input
          type="password"
          name="Login__AuthCode"
          label="Auth Code"
          onInput={ this.onInput('pass') }
          onKeyDown={ this.onKeyDown } />
        <div className="Login__Buttons">
          <Button
            name="Login__Authenticate"
            disabled={ authDisabled }
            onPressed={ logIn }>
            { pendingAttempt ? "Logging in..." : "Authenticate" }
          </Button>
          <Button
            name="Login__NewAgent"
            disabled={ pendingAttempt }>
            New Agent
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pendingAttempt: !!state.auth.lastAttempt && !state.auth.lastAttempt.finished,
});

const mapDispatchToProps = dispatch => ({
  logIn: ({ name, pass }) => {
    dispatch( logInAsync({
      username: name,
      password: pass
    }));
  }
});

export default connect( mapStateToProps, mapDispatchToProps )( Login );
