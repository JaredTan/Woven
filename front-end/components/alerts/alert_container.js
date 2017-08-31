import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Alerts from './alerts';
import {removeAlert} from '../../actions';

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts
  };
};


module.exports = connect(mapStateToProps, null)(Alerts);
