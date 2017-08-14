import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS,
  Animated,
  Dimensions,
  Vibration,
  TouchableWithoutFeedback
} from 'react-native';

import Healthbar from './healthbar';
import animateSprite from './animate_sprite';
import plantMessage from './plant_folder/plant_messages';

import {IMAGES, WATER, PLANT} from '../assets/spritesheets/sprites';
import BACKGROUND from '../assets/spritesheets/background/background';


const {width, height} = Dimensions.get('window');

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      water: false,

      health: props.plant.health,
      lastWater: props.plant.lastWater,
      nextWater: 0,
      displayError: "",
      message: ""
    };

    this.waterPlant = this.waterPlant.bind(this);
    this.dateDiff = this.dateDiff.bind(this);
    this.handleUpdatePlant = this.handleUpdatePlant.bind(this);
    this.calculateHealth = this.calculateHealth.bind(this);
    this.updateHealth = this.updateHealth.bind(this);
    this.updateNextWater = this.updateNextWater.bind(this);
    this.displayDisableMessage = this.displayDisableMessage.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    console.log("/////////////// WILL MOUNT ////////");
    this.props.fetchPlant(this.props.connectionId);
    this.calculateHealth();
    this.updateNextWater();
  }

  handleUpdatePlant() {
    this.props.plant.lastWater = this.state.lastWater;
    this.props.plant.health = this.state.health;

    this.props.updatePlant(this.props.connectionId, this.props.plant);
    this.updateNextWater();
  }

  dateDiff(){
    let recentWater = Date.now();
    let lastWater = new Date(this.state.lastWater).getTime();

    let diff =  parseInt((recentWater - lastWater) / (1000 * 60 * 60 * 24));

    return diff;
  }

  calculateHealth() {
    let decreasedHealth = this.dateDiff() * 20;

    let tempHealth = this.props.plant.health - decreasedHealth;
    if (tempHealth < 0) {tempHealth = 0;}

    this.setState({
      health: tempHealth
    });
  }

  updateHealth() {
    let health = this.state.health + 10;
    if (health > 100) {health = 100;}
    return health;
  }

  updateNextWater() {
    console.log(this.state.lastWater);
    let waterDate = new Date(this.state.lastWater);

    waterDate.setMinutes(waterDate.getMinutes()+5);

    this.setState({
      nextWater: waterDate
    });

  }

  waterPlant() {
    if (this.state.nextWater > this.state.lastWater) {
      this.displayDisableMessage();
    } else {
      this.setState({
        water: true,
        health: this.updateHealth(),
        lastWater: new Date(Date.now()),
        nextWater: this.updateNextWater(),
      });

      setTimeout(()=>{
        this.setState({
          water: false
        });
      }, 5000);

      this.handleUpdatePlant();
    }
  }

  getBackground(){
    let time = new Date().getHours();
    if ( time >= 20 ) {
      return BACKGROUND['night'];
    } else if ( time >= 16 ) {
      return BACKGROUND['evening'];
    } else if ( time >= 12 ) {
      return BACKGROUND['afternoon'];
    } else if ( time >= 7) {
      return BACKGROUND['morning'];
    } else {
      return BACKGROUND['night'];
    }

  }

  displayDisableMessage() {
    this.setState ({
      displayError: "I'm full!"
    });
    setTimeout(()=>{
      this.setState({
        displayError: ""
      });
    }, 700);
  }

  displayMessage(type) {

    this.setState ({
      message: type
    });
    let timeout = setTimeout(()=>{
      this.setState({
        message: ""
      });
    }, 700);
  }

  render() {

    let water = this.state.water ? animateSprite(WATER, 4, 500, 100, 100) : (<Text> </Text>);

    let background = this.getBackground();

    return (
      <View style={styles.container}>

          <View style={styles.background}>
            <Image source={background} style={{width, height}}>
            </Image>
          </View>

          <View style={styles.healthbar}>
            <Healthbar health={this.state.health} />
          </View>

          <Text style={styles.displayError}>
            {this.state.displayError}
          </Text>

          <TouchableOpacity
            onPress={this.waterPlant}
            style={styles.waterIcon}
          >
            <Image
              style={styles.roundedIcon}
              source={require('../assets/icons/waterIcon.png')}
            />
          </TouchableOpacity>

          {<plantMessage message={this.state.message} name={this.props.plant.name}/>}

          <TouchableWithoutFeedback
            style={styles.wrapper}
            onPress={
              () => {Vibration.vibrate([0, 500, 200, 500]);
                this.displayMessage("greeting");
              }
            }>

            <View style={styles.plant}>
              {animateSprite(PLANT, 3, 1500 - (this.state.health * 10), 500, height * 0.60)}
            </View>

          </TouchableWithoutFeedback>

          <View style={styles.water}>
            {water}
          </View>
      </View>
    );
  }
}



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
    backgroundColor: 'transparent',
    width: 65,
    height: 65,
    alignSelf: 'flex-end',
    top: 30,
    borderRadius: 180,
   },
   roundedIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain'
  },
  displayError: {
   position: 'absolute',
   color: 'red',
   top: 120,
   alignSelf: 'center',
   fontWeight: 'bold',
   fontSize: 20,
   shadowColor: '#FFF',
   shadowOffset: { width: 0, height: 0 },
   shadowOpacity: 0.5,
   shadowRadius: 1,
  },
});


export default Plant;
