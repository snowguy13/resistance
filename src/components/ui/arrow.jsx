import React, { Component, PropTypes } from 'react';
import { map } from '../../utility/object';

// Directional constants
const UP = 0;
const DOWN = 1;
const RIGHT = 2;
const LEFT = 3;

const reflectY = ry => ({ x, y }) => ({ x, y: 2*ry - y });
const transpose = ({ x, y }) => ({ x: y, y: x });
const toCoordString = ({ x, y }) => `${x} ${y}`;

// Coordinates for the different directions
const COORDS = ((upCoords) => {
  const reflected = map(upCoords, reflectY(0.5));

  return map({
    [UP]:    upCoords,
    [DOWN]:  reflected,
    [LEFT]:  map(upCoords, transpose),
    [RIGHT]: map(reflected, transpose),
  }, (coords) => map(coords, toCoordString));
})({
  p: { x: 1, y: 0 },
  c1: { x: 0, y: 1 },
  c2: { x: 2, y: 1 },
});

/**
 * A simple SVG arrow composed of three vertices: the point and two
 * corners. The resulting arrow is an isoceles triangle; the point
 * is where the two congruent sides meet, and the corners are where
 * either one of the congruent sides meets the long side.
 *
 * CSS Classes:
 *  (Block)   .Arrow
 *    The <svg> element
 *  (Element) .Arrow__Chevron
 *    The <path> containing the two sides connected to the point
 *  (Element) .Arrow__Back
 *    The <path> containing the one side not connected to the point
 *  (Element) .Arrow__Body
 *    The <path> containing the entire arrow triangle
 */
class Arrow extends Component {
  static displayName = 'Arrow';

  static propTypes = {
    // The direction the arrow should point
    direction: PropsTypes.oneOf([ UP, DOWN, RIGHT, LEFT ]),
  }

  static Directions = { UP, DOWN, LEFT, RIGHT };

  render() {
    const { p, c1, c2 } = COORDS[ this.props.direction ];
    const isVertical = dir === UP || dir === DOWN;

    // If the arrow points up or down, create a 2x1 grid
    // Otherwise, create a 1x2 grid
    const viewBox = `0 0 ${isVertical ? '2 1' : '1 2'}`;

    // Now, with coordinates in hand, we can construct the SVG
    return (
      <svg className="Arrow"
           viewBox={viewBox}>
        <path className="Arrow__Chevron"
              d={`M ${c1} L ${p} L ${c2} z`}/>
        <path className="Arrow__Back"
              d={`M ${c1} L ${c2} z`} />
        <path className="Arrow__Body"
              d={`M ${c1} L ${p} L ${c2} L ${c1} z`} />
      </svg>
    );
  }
}

export default Arrow;
