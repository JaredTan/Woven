import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Successes from './successes';
import {removeSuccess} from '../../actions';

const mapStateToProps = (state) => {
  return {
    successes: state.successes
  }
};


module.exports = connect(mapStateToProps, null)(Successes);
