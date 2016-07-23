import './login.scss';
import React, { Component, PropTypes } from 'react';
import Input from '../ui/input';
import Button from '../ui/button';

class Login extends Component {
  static displayName = 'Login'

  render() {
    return (
      <div className="Login">
        <div className="Login__Message">
          Please identify yourself.
        </div>
        <Input
          name="Login__AgentID"
          label="Agent ID" />
        <Input
          type="password"
          name="Login__AuthCode"
          label="Auth Code" />
        <div className="Login__Buttons">
          <Button name="Login__Authenticate">
            Authenticate
          </Button>
        </div>
        <div className="Login__Buttons">
          <Button name="Login__NewAgent">
            New Agent
          </Button>
          <Button name="Login__TempAgent">
            Temp Agent
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
