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
    this.width = (this.props.health % 100) * 2;
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
    backgroundColor: '#00EE10',
    height: 13,
    borderRadius: 20,
  };
}

const styles = StyleSheet.create({
  healthbar: {
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    width: 204,
    height: 17,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 13,
  },
  text: {
    position: 'absolute',
    bottom: 15,
    fontWeight: 'bold', 
    color: 'black',
  }
});


export default Healthbar;