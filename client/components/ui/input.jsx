import './input.scss';

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
    // Used as the [name] attribute for the child <input> element
    name:  PropTypes.string,

    // Used as the <input> element's [type] attribute
    type:  PropTypes.string,

    // Used as the element's [value] attribute
    value: PropTypes.string,

    // <input> element's [placeholder] attribute
    placeholder: PropTypes.string,

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
    value: '',
    placeholder: '',
    onInput: NOOP,
    onFocus: NOOP,
    onBlur: NOOP,
    onKeyDown: NOOP,
    onKeyUp: NOOP,
    onKeyPress: NOOP,
  }

  _input: HTMLInputElement;

  constructor( props ) {
    super( props );

    this.state = {
      focused: false,
    }
  }

  focus(): void {
    this.refs._input.focus();
  }

  _onFocus = () => {
    // Update state
    this.setState({ focused: true });

    // Invoke the given handler
    this.props.onFocus();
  }

  _onBlur = () => {
    // Update state
    this.setState({ focused: false });

    // Invoke the given handler
    this.props.onBlur();
  }

  _onInput = ( ev ) => {
    // Invoke the given handler
    this.props.onInput( ev.target.value );
  }

  _onKeyEvent = ( type ) => ( ev ) => {
    const key = ev.keyCode || ev.which;

    // Invoke the handler with the event's key code.
    this.props[ type ]( key );
  }

  render() {
    const {
      props: { name, placeholder, type, value },
      state: { focused },
      _onFocus, _onBlur, _onInput, _onKeyEvent
    } = this;

    return (
      <div className={classes('Input', {
        ['Input--empty']: !value,
        ['Input--focused']: focused,
      })}>
        <input
          ref={el => this._input = el}
          className="Input__Field"
          name= { name }
          type={ type }
          value={ value }
          placeholder={ placeholder }
          onFocus={ _onFocus }
          onBlur={ _onBlur }
          onInput={ _onInput }
          onKeyDown={ _onKeyEvent('onKeyDown') }
          onKeyUp={ _onKeyEvent('onKeyUp') }
          onKeyPress={ _onKeyEvent('onKeyPress') }/>
      </div>
    );
  }
}

export default Input;
