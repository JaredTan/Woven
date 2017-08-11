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
      waterframe: "waterframe0"
    };

    this.getImage = this.getImage.bind(this);
    this.waterPlant = this.waterPlant.bind(this);
  }

  getImage(arr, num) {
    return arr['image' + num];
  }


  waterPlant() {
    let startWater = setInterval(() => {
        this.setState({
         waterframe: ("waterframe" + (parseInt(this.state.waterframe[10]) + 1))
        });
      }, 300);

      setTimeout(() => {
        clearInterval(startWater);
        this.setState({
          waterframe: "waterframe0"
        });
      }, 1000);

  }

  // waterPlant() {
  //   let i = 1;
  //   while (i < 4) {
  //     this.setState({
  //       waterframe: "waterframe" + i
  //     });
  //     i++;
  //   }
  //   this.setState({
  //     waterframe: "waterframe0"
  //   });
  // }

  render() {

    return (
      <View style={styles.container}>
          {/* {animateSprite(BACKGROUND, 2, 3600, styles.background)} */}
          <TouchableOpacity
            onPress={this.waterPlant}>
            <Image
              style={styles.waterIcon}
              source={require('../assets/icons/waterIcon.png')}
            />
          </TouchableOpacity>

          <View>
            <Image
              style={styles[this.state.waterframe]}
              source={require('../assets/icons/drops_0.png')}
            />
          </View>
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
     backgroundColor: 'transparent',
   },
   waterIcon: {
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    top: 30
  },
  waterframe0: {
    display: 'none',
    alignSelf: 'center',
  },
  waterframe1: {
    top: 20,
    alignSelf: 'center',
    width: 200,
    height: 200
  },
  waterframe2: {
    top: 50,
    alignSelf: 'center',
    width: 200,
    height: 200
  },
  waterframe3: {
    top: 90,
    alignSelf: 'center',
    width: 200,
    height: 200
  },
});

export default Plant;
