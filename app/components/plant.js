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

import Healthbar from './healthbar';
import animateSprite from './animate_sprite';

import IMAGES from '../assets/spritesheets/sprites';

import BACKGROUND from '../assets/spritesheets/background/background';


class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plantframe: 0,
      bgframe: 0,
      health: 50
    };

    this.getImage = this.getImage.bind(this);
  }

  getImage(arr, num) {
    return arr['image' + num];
  }

  render() {

    return (
      <View style={styles.container}>
          {/* {animateSprite(BACKGROUND, 2, 3600, styles.background)} */}
          <View style={styles.healthbar}>
            <Healthbar health={this.state.health} />
          </View>
          <View style={styles.plant}>
            {animateSprite(IMAGES, 24, 60, 200, 200)}
          </View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');
console.log('Width: ', width, 'Height: ', height);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
    alignItems: 'stretch',
  },
  background: {
    position: 'absolute',
    left: 50,
  },
  plant: {
    position: 'absolute',
    top: 200,
    backgroundColor: 'blue',
  },
  healthbar: {
    position: 'absolute',
    top: 20,
  },
});

export default Plant;
