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

export default connect(mapStateToProps)(Successes);
