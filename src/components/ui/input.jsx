import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classes from '../../utility/css-classes';

const DEFAULT_TYPE = 'text';
const NOOP = () => {};

class Input extends Component {
  static displayName = 'Input'

  static propTypes = {
    name:  PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type:  PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onInput: PropTypes.func,
  }

  static defaultProps = {
    type: DEFAULT_TYPE,
    onInput: NOOP,
    onFocus: NOOP,
    onBlur: NOOP,
  }

  constructor( props ) {
    super( props );

    this.state = {
      focused: false,
      value: '',
    }
  }

  componentDidMount() {
    const input = findDOMNode( this.refs.input );
    const handlers = this.handlers;

    // Bind event handlers to the input element
    for( let eventType in handlers ) {
      input.addEventListener( eventType, handlers[ eventType ] );
    }
  }

  componentWillUnmount() {
    const input = findDOMNode( this.refs.input );
    const handlers = this.handlers;

    // Remove bound event listeners
    for( let eventType in handlers ) {
      input.removeEventListener( eventType, handlers[ eventType ] );
    }
  }

  _onFocus() {
    // Update state
    this.setState({ focused: true });

    // Invoke the given handler
    this.props.onFocus();
  }

  _onBlur() {
    // Update state
    this.setState({ focused: false });

    // Invoke the given handler
    this.props.onBlur();
  }

  _onInput() {
    const newValue = findDOMNode( this.refs.input ).value;

    // Update state
    this.setState({ value: newValue });

    // Invoke the given handler
    this.props.onInput( newValue );
  }

  handlers = {
    focus: this._onFocus.bind(this),
    blur: this._onBlur.bind(this),
    input: this._onInput.bind(this),
  }

  onLabelClick() {
    findDOMNode(this.refs.input).focus();
  }

  render() {
    const { name, label, type } = this.props;
    const { focused, value } = this.state;

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
          placeholder={ label } />
      </div>
    );
  }
}

export default Input;
