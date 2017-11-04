import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Alert from './alert';
import Dimensions from 'Dimensions';

class Alerts extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let renderAlerts = () => {
      return this.props.alerts.map((alert) => {
        return (
          <Alert alert={alert} key={alert.id}></Alert>
        );
      });
    };
    return (
      <View style={styles.container}>
        {renderAlerts()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: Dimensions.get('window').height*.02,
    left: 0,
    right: 0
  }
});

export default Alerts;
