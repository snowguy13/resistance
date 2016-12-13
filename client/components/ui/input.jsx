import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classes from '../../utility/css-classes';
import { NOOP } from '../../utility/function';

const DEFAULT_TYPE = 'text';

/**
 * A simple component for creating input elements. Supports
 * focus, blur, and input events. Input focusing has a special
 * CSS class (see below), but other psuedo-classes work as usual.
 *
 * CSS Classes:
 *  (Block)    .Input
 *    The container element. The <label> and <input> document
 *    elements sit inside here.
 *  (Modifier) --Focused
 *    Applied when the <input> element has focus in the DOM.
 *  (Modifier) --Empty
 *    Applied when the <input> element is empty (value is "").
 *  (Element)  __Label
 *    The label
 *  (Element)  __Field
 *    The <input> element sitting inside the container.
 */
class Input extends Component {
  static displayName = 'Input'

  static propTypes = {
    // Used as the [name] attribute for the child <input> element,
    // and as the [for] attribute on the child <label> element
    name:  PropTypes.string.isRequired,

    // Used as the text within the <label> element and as the
    // <input> element's [placeholder] attribute
    label: PropTypes.string.isRequired,

    // Used as the <input> element's [type] attribute
    type:  PropTypes.string,

    // Typical event bindings, applied to the child <input> element
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onInput: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyPress: PropTypes.func,
  }

  static defaultProps = {
    type: DEFAULT_TYPE,
    onInput: NOOP,
    onFocus: NOOP,
    onBlur: NOOP,
    onKeyDown: NOOP,
    onKeyUp: NOOP,
    onKeyPress: NOOP,
  }

  constructor( props ) {
    super( props );

    this.state = {
      focused: false,
      value: '',
    }
  }

  onFocus = () => {
    // Update state
    this.setState({ focused: true });

    // Invoke the given handler
    this.props.onFocus();
  }

  onBlur = () => {
    // Update state
    this.setState({ focused: false });

    // Invoke the given handler
    this.props.onBlur();
  }

  onInput = ( ev ) => {
    const newValue = ev.target.value;

    // Update state
    this.setState({ value: newValue });

    // Invoke the given handler
    this.props.onInput( newValue );
  }

  onKeyEvent = ( type ) => ( ev ) => {
    const key = ev.keyCode || ev.which;

    // Invoke the handler with the event's key code.
    this.props[ type ]( key );
  }

  render() {
    const {
      props: { name, label, type },
      state: { focused, value },
      onFocus, onBlur, onInput, onKeyEvent
    } = this;

    return (
      <div className={classes('Input', {
        ['Input--empty']: !value,
        ['Input--focused']: focused,
      })}>
        <label
          className="Input__Label"
          for={ name }>{ label }</label>
        <input
          ref="input"
          className="Input__Field"
          name= { name }
          type={ type }
          placeholder={ label }
          onFocus={ onFocus }
          onBlur={ onBlur }
          onInput={ onInput }
          onKeyDown={ onKeyEvent('onKeyDown') }
          onKeyUp={ onKeyEvent('onKeyUp') }
          onKeyPress={ onKeyEvent('onKeyPress') }/>
      </div>
    );
  }
}

export default Input;
