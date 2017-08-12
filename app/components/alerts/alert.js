import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import {removeAlert} from '../../actions';

var Alert = React.createClass({
  onRemoveAlert() {
    var {dispatch, alert} = this.props;
    dispatch(removeAlert(alert.id));
  },
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onRemoveAlert}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {this.props.alert.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#cdf9d8',
    borderColor: '#bbf7ca',
    borderTopWidth: 2
  },
  text: {
    color: "gray"
  }
});

module.exports = connect()(Alert);
