import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS,
  Animated,
  Dimensions
} from 'react-native';


class Healthbar extends React.Component {
  constructor(props) {
    super(props);
    this.width = this.props.health * 2;
  }

  render() {
    let width = this.width;
    return(
      <View style={styles.healthbar}>
      <Text style={styles.text}>
        Health
      </Text>
        <View style={health({ width })}>
        </View>
      </View>
    );
  }
}

function health(options) {
  return {
    width: options.width,
    backgroundColor: 'green',
    height: 13,
    borderRadius: 13,
  };
}

const styles = StyleSheet.create({
  healthbar: {
    backgroundColor: 'transparent',
    width: 200,
    height: 13,
    borderRadius: 13,
  },
  text: {
    position: 'absolute',
    bottom: 15,
    fontWeight: 'bold', 
  }
});


export default Healthbar;