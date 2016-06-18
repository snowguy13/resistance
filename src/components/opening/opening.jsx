import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Splash from './splash';
import { setContainer } from '../../actions/all';
import { LOGIN } from '../container-types';

class OpeningContainer extends Component {
  static displayName = 'OpeningContainer'

  render() {
    setTimeout(() => {
      this.props.setContainer( LOGIN );
    }, 15000);

    return (<Splash />);
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
