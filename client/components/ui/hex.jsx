import React, { Component } from 'react';
import Arrow, { Directions } from './arrow';

const renderHex = (elements, Wrap = false) => {
  const left = <Arrow direction={Directions.LEFT} />;
  const right = <Arrow direction={Directions.RIGHT} />;

  const children = [ left ]
    .concat( elements )
    .concat( right );

  return Wrap ? <Wrap>{ children }</Wrap> : children;
};

const Hex = (Component, inside = false) => {
  class HexComponent extends Component {
    render() {
      const props = this.props;

      return inside ?
        (<Component {...props}>
          { renderHex(props.children) }
        </Component>) :
        renderHex(<Component {...props} />);
    }
  }

  HexComponent.displayName = `Hex(${Component.displayName})`;

  return HexComponent;
};

export default Hex;
export { renderHex };
