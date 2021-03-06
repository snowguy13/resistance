import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReactOutsideEvent from 'react-outside-event';

import { renderHex } from './hex';
import Arrow, { Directions } from './arrow';

import { NOOP } from '../../utility/function';
import classes from '../../utility/css-classes';

import './button.scss';

/**
 * A simple component for creating buttons. Only supports
 * an 'onPress' event, which is fired when the underlying
 * <button> is clicked or (optionally) when it is Focused
 * and [Enter] is pressed. A special 'pressed' CSS modifier
 * is also provided to encompass clicking and [Enter]-pressing.
 * Specify the contents of a <Button> as you would for normal
 * HTML; ie, <Button>button text here</Button>.
 *
 * CSS Classes:
 *  (Block)    .Button
 *    The <button> element
 *  (Modifier) --pressed
 *    Set when the user's mouse is pressed down over the <button>
 *    or when the [Enter] key is pressed down while the <button>
 *    is focused.
 *  (Element)  __Content
 *    The wrapper <div> for the children passed to the button.
 */
class Button extends Component {
  static displayName = 'Button'

  static propTypes = {
    // Used as the [name] attribute on the underlying <button>
    name: PropTypes.string,

    // Used for the <button> element's [disabled] attribute
    disabled: PropTypes.bool,

    // Set to 'true' if users should be able to interact
    // with this button via the [Enter] key
    enterPress: PropTypes.bool,

    // Fired when the <button> is clicked or, if [enterPress]
    // is set to 'true', when [Enter] is pressed while the
    // button is focused
    onPress: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    enterPress: true,
    onPress: NOOP,
  }

  constructor( props ) {
    super( props );

    this.state = {
      mouseDown: false,
      enterPressed: false,
    };
  }

  onMouseDown = () => {
    // Update state
    this.setState({ mouseDown: true });
  }

  onMouseUp = () => {
    const { onPress } = this.props;
    const { enterPressed } = this.state;

    // Update state
    this.setState({ mouseDown: false });

    // And fire the onPress event, so long as the
    // [Enter] key is not pressed
    if( !enterPressed ) {
      onPress();
    }
  }

  onKeyDown = ( ev ) => {
    const key = ev.keyCode || ev.which;

    switch( key ) {
      case 13: // [Enter] TODO create better key manager
        // Update state if allowed by props
        if( this.props.enterPress ) {
          this.setState({ enterPressed: true });
        }
        break;
      default: break;
    }
  }

  onKeyUp = ( ev ) => {
    const key = ev.keyCode || ev.which;
    const { enterPress, onPress } = this.props;
    const { mouseDown } = this.state;

    switch( key ) {
      case 13: // [Enter] TODO create better key manager
        // If allowed by props...
        if( enterPress ) {
          // Update state
          this.setState({ enterPressed: false });

          // And fire the onPress event, so long as the
          // mouse is not also pressed on the button
          if( !mouseDown ) {
            onPress();
          }
        }
        break;
      default: break;
    }
  }

  onOutsideEvent = ( ev ) => {
    switch( ev.type ) {
    case 'mouseup':
      // Mouse up outside the button, so set mouseDown to false
      this.setState({ mouseDown: false });
      break;
    default:
      break;
    }
  }

  render() {
    const {
      props: { name, disabled, children },
      state: { mouseDown, enterPressed },
      onMouseDown, onMouseUp,
      onKeyDown, onKeyUp,
    } = this;

    /*const buttonChildren = renderHex(
      <div className="Button__Contents">
        { children }
      </div>
    );*/

    return (<button
      ref="button"
      type="button"
      name={ name }
      disabled={ disabled }
      className={classes('Button', {
        ['Button--pressed']: mouseDown || enterPressed
      })}
      onMouseDown={ onMouseDown }
      onMouseUp={ onMouseUp }
      onKeyDown={ onKeyDown }
      onKeyUp={ onKeyUp }>
      <div className="Button__Contents">
        { children }
      </div>
    </button>);
  }
};

export default ReactOutsideEvent(Button, ['mouseup']);
