import React from 'react';
import ReactDOM from 'react-dom';

class MyEl extends React.Component {
  render() {
    return (
      <div className="test">{ this.props.text }</div>
    );
  }
};

ReactDOM.render( <MyEl text="Whoa!" />, document.body );
