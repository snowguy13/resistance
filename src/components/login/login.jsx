import './login.scss';
import React, { Component, PropTypes } from 'react';
import Input from '../ui/input';

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
          name="Login__AuthCode"
          label="Auth Code" />
        { /* <div className="Login__Input">
          <label for="Login__Username">
            Agent ID
          </label>
          <input type="text" placeholder="Agent ID" />
        </div>
        <div className="Login__Input">
          <label for="Login__Password">
            Auth Code
          </label>
          <input type="password" placeholder="Auth Code" />
        </div> */ }
        <div className="Login__Buttons">
          <button className="Login__Button">Authenticate</button>
        </div>
        <div className="Login__Buttons">
          <button className="Login__Button">Register</button>
          <button className="Login__Button">Temp Agent</button>
        </div>
      </div>
    );
  }
}

export default Login;
