import React from 'react';
import Arrow from './arrow';

const renderHex = (element, Wrap = false) => {
  const children = [
    <Arrow direction={Directions.LEFT} />,
    element,
    <Arrow direction={Directions.RIGHT} />,
  ];

  return Wrap ? <Wrap>{ children }</Wrap> : children;
};

const Hex = Component => props => renderHex(<Component {...props} />);

export default Hex;
export { renderHex };
