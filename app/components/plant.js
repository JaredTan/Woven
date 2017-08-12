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


import {IMAGES, WATER, PLANT} from '../assets/spritesheets/sprites';
import BACKGROUND from '../assets/spritesheets/background/background';




const {width, height} = Dimensions.get('window');
console.log('Width: ', width, 'Height: ', height);

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      drops: "drops0",
      water: false,
      waterStatus: false,
      plantframe: 0,
      bgframe: 0,
      health: 50
    };

    // this.getImage = this.getImage.bind(this);
    this.waterPlant = this.waterPlant.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    this.props.fetchPlant(this.props.connectionId);
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
          
          <View style={styles.background}>
            {animateSprite(BACKGROUND, 4, 10000, width, height)}
            
          </View>
          <View style={styles.header}>
            <Text style={styles.name}>
              Greggles
            </Text>
          </View>
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
            {animateSprite(PLANT, 3, 500, 500, height * 0.60)}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height - 55,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    alignItems: 'stretch',
  },
  background: {
    bottom: 10,
    position: 'absolute',
    alignSelf: 'center',
   },
   header: {
     alignItems: 'center'
   },
   healthbar: {
    left: 10,
    position: 'absolute',
    top: 60,
   },
   name: {
     fontSize: 25,
     fontWeight: 'bold',
     color: 'black',
   },
   plant: {
     position: 'absolute',
     bottom: 40,
     alignSelf: 'center',
     backgroundColor: 'transparent',
   },
   water: {
     position: 'absolute',
     bottom: '40%',
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
