import './lobby.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from '../ui/button';
import Input from '../ui/input';

const Sidebar = () => (
  <div className="Lobby__Sidebar">
    Here's the sidebar.
  </div>
);

const Chat = () => (
  <div className="Lobby__Chat">
    <div className="Lobby__Chat__Messages">
      Chat messages go here.
    </div>
    <div className="Lobby__Chat__InputBox">
      <Input
        className="Lobby__Chat__InputBox__Input"
        placeholder="Type your message here. Press [Enter] to send."
      />
      <Button className="Lobby__Chat__InputBox__SendButton">
        Send
      </Button>
    </div>
  </div>
);

class Lobby extends Component {
  render() {
    return (
      <div className="Lobby">
        <Sidebar />
        <Chat />
      </div>
    );
  }
}

export default connect()( Lobby );
