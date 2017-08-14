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

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      water: false,

      health: props.plant.health,
      lastWater: props.plant.lastWater,
      nextWater: 0,
      displayError: ""
    };

    this.waterPlant = this.waterPlant.bind(this);
    this.dateDiff = this.dateDiff.bind(this);
    this.handleUpdatePlant = this.handleUpdatePlant.bind(this);
    this.calculateHealth = this.calculateHealth.bind(this);
    this.updateHealth = this.updateHealth.bind(this);
    this.updateNextWater = this.updateNextWater.bind(this);
    this.displayDisableMessage = this.displayDisableMessage.bind(this);
  }

  componentDidMount() {
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

    let waterDate = new Date(this.state.lastWater);

    waterDate.setMinutes(waterDate.getMinutes()+5);

    return waterDate;

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


  render() {

    let water = this.state.water ? animateSprite(WATER, 4, 500, 100, 100) : (<Text> </Text>);

    let background = this.getBackground();

    return (
      <View style={styles.container}>
          <View style={styles.background}>
            <Image source={background} style={{width, height: height * 0.90}}>
            </Image>
          </View>

          <View style={styles.header}>
            <Text style={styles.greeting}>
              {this.props.plant.name} says `Hi`!
            </Text>
          </View>

          <View style={styles.healthbar}>
            <Healthbar health={this.state.health} />
          </View>
          <View style={styles.waterIcon}>
            <TouchableOpacity
              onPress={this.waterPlant}
              >
              <Image
                style={styles.roundedIcon}
                source={require('../assets/icons/waterIcon.png')}
                />
            </TouchableOpacity>
          </View>

          <Text style={styles.displayError}>
            {this.state.displayError}
          </Text>

          <View style={styles.plant}>
            {animateSprite(PLANT, 3, 1500 - (this.state.health * 10), 500, height * 0.60)}
          </View>
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
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    alignItems: 'stretch',
  },
  background: {
    flex: 1,
    position: 'absolute',
    zIndex: -1
  },
  healthbar: {
    top: Dimensions.get('window').height*.1,
    left: Dimensions.get('window').width*.02
  },
  waterIcon: {
    top: Dimensions.get('window').height*.05,
    left: Dimensions.get('window').width*.8,
  },
  plant: {
    top: Dimensions.get('window').height*.3,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    top: Dimensions.get('window').height*.16,
    backgroundColor: "#f2f2f2",
  },
  greeting: {
    fontSize: 20,
    opacity: .6,
    padding: 13,
    borderRadius: 60,
    alignSelf: 'center'
  },
  water: {
    top: Dimensions.get('window').height*.3,
    position: 'absolute',
    alignSelf: 'center'
  },
  displayError: {
    position: 'absolute',
    color: '#f4967e',
    top: Dimensions.get('window').height*.15,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  roundedIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain'
  },
});


export default Plant;
