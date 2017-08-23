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

class BodyText extends React.Component {

  render() {
    return(
      <Text style={{fontFamily: 'roboto', fontSize: 14, color: '#383838' }}>
        {this.props.children}
      </Text>
    );
  }
}

export default BodyText;
