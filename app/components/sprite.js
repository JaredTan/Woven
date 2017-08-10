import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS,
  Animated
} from 'react-native';

import NavBar from './navbar';
import IMAGES from '../assets/spritesheets/sprites';
import animateSprite from './animate_sprite';


class Sprite extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {animateSprite(IMAGES, 24, 60)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
    alignItems: 'stretch',
  },
  sprite: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'center'
  }
});

export default Sprite;
