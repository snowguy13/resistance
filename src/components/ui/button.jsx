import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ReactOutsideEvent from 'react-outside-event';
import { NOOP } from '../../utility/function';
import classes from '../../utility/css-classes';

/**
 * A simple component for creating buttons. Only supports
 * an 'onPressed' event, which is fired when the underlying
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
 */
class Button extends Component {
  static displayName = 'Button';

  static propTypes = {
    // Used as the [name] attribute on the underlying <button>
    name: PropTypes.string.isRequired,

    // Used for the <button> element's [disabled] attribute
    disabled: PropTypes.bool,

    // Set to 'true' if users should be able to interact
    // with this button via the [Enter] key
    enterPress: PropTypes.bool,

    // Fired when the <button> is clicked or, if [enterPress]
    // is set to 'true', when [Enter] is pressed while the
    // button is focused
    onPressed: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    enterPress: true,
    onPressed: NOOP,
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
    const { onPressed } = this.props;
    const { enterPressed } = this.state;

    // Update state
    this.setState({ mouseDown: false });

    // And fire the onPressed event, so long as the
    // [Enter] key is not pressed
    if( !enterPressed ) {
      onPressed();
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
    const { enterPress, onPressed } = this.props;
    const { mouseDown } = this.state;

    switch( key ) {
      case 13: // [Enter] TODO create better key manager
        // If allowed by props...
        if( enterPress ) {
          // Update state
          this.setState({ enterPressed: false });

          // And fire the onPressed event, so long as the
          // mouse is not also pressed on the button
          if( !mouseDown ) {
            onPressed();
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
      { children }
    </button>);
  }
};

export default ReactOutsideEvent(Button, ['mouseup']);
