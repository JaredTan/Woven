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

import animateSprite from './animate_sprite';

import IMAGES from '../assets/spritesheets/sprites';

import BACKGROUND from '../assets/spritesheets/background/background';


class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plantframe: 0,
      bgframe: 0,
    };

    this.getImage = this.getImage.bind(this);
  }

  getImage(arr, num) {
    return arr['image' + num];
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundlayer}>
          {animateSprite(BACKGROUND, 2, 3600, styles.background)}
        </View>
        <View style={styles.overlay}>
          {animateSprite(IMAGES, 24, 60, styles.plant)}
        </View>
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
  backgroundlayer: {
    position: 'absolute',
     alignSelf: 'center',
     justifyContent: 'center',
    //  resizeMode: 'cover',
    },
    background: {
    //  alignSelf: 'center',
    //  justifyContent: 'center',
    //  resizeMode: 'cover',
   },
   plant: {
    //  bottom: '15',
    //  alignSelf: 'center',
    //  justifyContent: 'center',
     backgroundColor: 'transparent',
   },
   overlay: {
     alignSelf: 'center',
     justifyContent: 'center',
     backgroundColor: 'transparent',
    }
});

export default Plant;
