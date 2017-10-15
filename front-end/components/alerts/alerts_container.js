import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Alerts from './alerts';

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts
  };
};

export default connect(mapStateToProps, null)(Alerts);
