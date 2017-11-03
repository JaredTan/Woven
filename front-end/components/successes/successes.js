import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import Success from './success';
import Dimensions from 'Dimensions';

class Successes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderSuccesses = () => {
      return this.props.successes.map((success) => {
        return (
          <Success success={success} key={success.id}></Success>
        );
      });
    };
    return (
      <View style={styles.container}>
        {renderSuccesses()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: Dimensions.get('window').height*.10,
    left: 0,
    right: 0
  }
});

export default Successes;
