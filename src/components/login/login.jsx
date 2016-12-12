import './login.scss';
import React, { Component, PropTypes } from 'react';
import Input from '../ui/input';
import Button from '../ui/button';

class Login extends Component {
  static displayName = 'Login'

  state = {
    name: '',
    pass: ''
  }

  onInput = ( whichInput ) => ( newValue ) => {
    this.setState({
      [whichInput]: newValue,
    });
  }

  render() {
    const { name, pass } = this.state;
    const authDisabled = !name || !pass;

    return (
      <div className="Login">
        <div className="Login__Message">
          Please identify yourself.
        </div>
        <Input
          name="Login__AgentID"
          label="Agent ID"
          onInput={ this.onInput('name') } />
        <Input
          type="password"
          name="Login__AuthCode"
          label="Auth Code"
          onInput={ this.onInput('pass') } />
        <div className="Login__Buttons">
          <Button name="Login__Authenticate" disabled={ authDisabled }>
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

export default Login;
