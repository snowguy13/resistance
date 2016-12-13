import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Splash from './splash';
import { setContainer } from '../../actions/all';
import { LOGIN } from '../../constants/container-types';

class OpeningContainer extends Component {
  static displayName = 'OpeningContainer'

  render() {
    return (<Splash onComplete={ () => this.props.setContainer( LOGIN ) } />);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setContainer: (type) => {
      dispatch( setContainer(type) );
    }
  }
}

export default connect( null, mapDispatchToProps )( OpeningContainer );
