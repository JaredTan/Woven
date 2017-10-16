import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import Dimensions from 'Dimensions';

class EmptyView extends React.Component {

  render() {
    return (
      <View>
        <Image style={styles.logo} source={require('../assets/icons/woven-logo-copy.png')} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  logo: {
    width: Dimensions.get('window').width*.4,
    height: Dimensions.get('window').width*.4,
    margin: Dimensions.get('window').width*.2,
    alignSelf: 'center'
  }
})

export default EmptyView;
