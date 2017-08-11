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
      waterStatus: false,
      plantframe: 0,
      bgframe: 0,
    };

    this.getImage = this.getImage.bind(this);
  }

  getImage(arr, num) {
    return arr['image' + num];
  }

  waterPlant() {

  }

  render() {

    return (
      <View style={styles.container}>
          {/* {animateSprite(BACKGROUND, 2, 3600, styles.background)} */}
          <TouchableOpacity

            onPress={this.navToPlant}>
            <Image
              style={styles.waterIcon}
              source={require('../assets/icons/waterIcon.png')}
            />
          </TouchableOpacity>

          <View style={styles.plant}>
            {animateSprite(IMAGES, 24, 60, 150, 150)}
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
    height: Dimensions.get('window').height-55
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
    //  left: '20%',
    //  top: 200,
     bottom: '10%',
     alignSelf: 'center',
    //  justifyContent: 'center',
     backgroundColor: 'blue',
   },
   waterIcon: {
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    top: 30
   }
});

export default Plant;
