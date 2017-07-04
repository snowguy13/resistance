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

type ChatProps = {
  inputText: string,
  onChatInput: (string) => void,
  onPressSend: () => void,
};
const Chat = ({ inputText, onChatInput, onPressSend }: ChatProps) => (
  <div className="Lobby__Chat">
    <div className="Lobby__Chat__Messages">
      Chat messages go here.
    </div>
    <div className="Lobby__Chat__InputBox">
      <Input
        className="Lobby__Chat__InputBox__Input"
        value={ inputText }
        placeholder="Type your message here. Press [Enter] to send."
        onInput={ onChatInput }
      />
      <Button
        className="Lobby__Chat__InputBox__SendButton"
        disabled={ !inputText }
        onPress={ onPressSend }>
        Send
      </Button>
    </div>
  </div>
);

type State = {
  chatText: string,
};

class Lobby extends Component {
  static displayName = 'Lobby';

  state: State = {
    chatText: '',
  };

  _onChatInput = (text: string): void => {
    this.setState({ chatText: text });
  }

  _sendChatMessage = (): void => {
    this.setState({ chatText: '' });
  }

  render() {
    const {
      state: { chatText },
      _onChatInput, _sendChatMessage,
    } = this;

    return (
      <div className="Lobby">
        <Sidebar />
        <Chat
          inputText={ chatText }
          onChatInput={ _onChatInput }
          onPressSend={ _sendChatMessage }
        />
      </div>
    );
  }
}

export default connect()( Lobby );
