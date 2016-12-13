import './login.scss';

import React, { Component, PropTypes } from 'react';
import Input from '../ui/input';
import Button from '../ui/button';

import { setContainer } from '../../actions/all';
import { LOGIN } from '../../constants/container-types';

class Login extends Component {
  static displayName = 'Login'

  state = {
    name: '',
    pass: ''
  }

  canAuthenticate = () => {
    return !!this.state.name && !!this.state.pass;
  }

  authenticate = () => {
    console.log(`Logging in as '${this.state.name}', password is ${this.state.pass}`);
  }

  onInput = ( whichInput ) => ( newValue ) => {
    this.setState({
      [whichInput]: newValue,
    });
  }

  onKeyDown = ( key ) => {
    // If [Enter] and all authentication conditions are met...
    if( key == 13 ) {
      if( this.canAuthenticate() ) {
        // ... authenticate!
        this.authenticate();
      }
    }
  }

  render() {
    const authDisabled = !this.canAuthenticate();
    const { authenticate } = this;

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
            onPressed={ authenticate }>
            Authenticate
          </Button>
          <Button name="Login__NewAgent">
            New Agent
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: ({ name, pass }) => {
      dispatch( setContainer(type) );
    }
  }
}

export default Login;
