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

import {IMAGES, WATER} from '../assets/spritesheets/sprites';

import BACKGROUND from '../assets/spritesheets/background/background';


class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      drops: "drops0",
      water: false
      waterStatus: false,
      plantframe: 0,
      bgframe: 0,
      health: 50
    };

    // this.getImage = this.getImage.bind(this);
    this.waterPlant = this.waterPlant.bind(this);
  }

  waterPlant() {
    this.setState({
      water: true
    });

    setTimeout(()=>{
      this.setState({
        water: false
      });
    }, 5000);
  }


  render() {

    let water = this.state.water ? animateSprite(WATER, 4, 500, 100, 100) : (<Text> </Text>);

    return (
      <View style={styles.container}>
          {/* {animateSprite(BACKGROUND, 2, 3600, styles.background)} */}

          <View style={styles.healthbar}>
            <Healthbar health={this.state.health} />
          </View>

          <TouchableOpacity
            onPress={this.waterPlant}>
            <Image
              style={styles.waterIcon}
              source={require('../assets/icons/waterIcon.png')}
            />
          </TouchableOpacity>


          <View style={styles.plant}>
            {animateSprite(IMAGES, 24, 60, 150, 150)}
          </View>
          <View style={styles.water}>
            {water}
          </View>
      </View>
    );
  }
}

// <Image
//   style={styles[this.state.drops]}
//   source={WATER[this.state.drops]}
// />
const {width, height} = Dimensions.get('window');
console.log('Width: ', width, 'Height: ', height);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
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
   water: {
     position: 'absolute',
     bottom: '30%',
     alignSelf: 'center'
   },
   waterIcon: {
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    top: 30
  },
  // drops0: {
  //   display: 'none',
  //   alignSelf: 'center',
  // },
  // drops1: {
  //   top: 20,
  //   alignSelf: 'center',
  //   height: 200,
  //   resizeMode: 'contain'
  // },
  // drops2: {
  //   top: 50,
  //   alignSelf: 'center',
  //   height: 200,
  //   resizeMode: 'contain'
  // },
  // drops3: {
  //   top: 90,
  //   alignSelf: 'center',
  //   height: 200,
  //   resizeMode: 'contain'
  // },
});

export default Plant;
