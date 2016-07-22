import React, { Component, PropTypes } from 'react';
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

  componentDidMount() {
    const button = findDOMNode( this.refs.button );
    const handlers = this.handlers;

    // Bind event handlers to the input element
    for( let eventType in handlers ) {
      input.addEventListener( eventType, handlers[ eventType ] );
    }
  }

  componentWillUnmount() {
    const button = findDOMNode( this.refs.button );
    const handlers = this.handlers;

    // Remove bound event listeners
    for( let eventType in handlers ) {
      input.removeEventListener( eventType, handlers[ eventType ] );
    }
  }

  handlers = {
    mousedown: this._mouseDown,
    mouseup: this._mouseUp,
    keydown: this._keyDown,
    keyup: this._keyUp,
  }

  _onMouseDown = () => {
    // Update state
    this.setState({ mouseDown: true });
  }

  _onMouseUp = () => {
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

  _onKeyDown = ( ev ) => {
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

  _onKeyUp = ( ev ) => {
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
    const { name, disabled, children } = this.props;
    const { mouseDown, enterPressed } = this.state;

    <button
      ref="button"
      type="button"
      name={ name }
      disabled={ disabled }
      className={classes('Button', {
        ['Button--pressed']: mouseDown || enterPressed
      })}>
      { children }
    </button>
  }
};

export default ReactOutsideEvent(Button, ['mouseup']);
