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

class Link extends React.Component {

  render() {
    return(
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#12512d', textAlign: 'center',}}>
        {this.props.children}
      </Text>
    );
  }
}

export default Link;
