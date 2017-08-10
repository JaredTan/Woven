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
          {/* {animateSprite(BACKGROUND, 2, 3600, styles.background)} */}
          <Text>
            hi
          </Text>
          <View style={styles.plant}>
            {animateSprite(IMAGES, 24, 60)}
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
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
    alignItems: 'stretch',
  },
  background: {
    position: 'absolute',
    left: 50,
    //  alignSelf: 'center',
    //  justifyContent: 'center',
    //  resizeMode: 'cover',
   },
   plant: {
     position: 'absolute',
     left: '20%',
     top: 200,
    //  bottom: '15',
    //  alignSelf: 'center',
    //  justifyContent: 'center',
     backgroundColor: 'transparent',
   },
  //  overlay: {
  //    alignSelf: 'center',
  //    justifyContent: 'center',
  //    backgroundColor: 'transparent',
  //   }
});

export default Plant;
