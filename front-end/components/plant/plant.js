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
import PlantMessage from './plant_messages';
import InputModal from './input_modal_container';
import {IMAGES, WATER, PLANT} from '../../assets/spritesheets/sprites';
import BACKGROUND from '../../assets/spritesheets/background/background';
const {width, height} = Dimensions.get('window');

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      water: false,
      name: props.plant.name,
      health: props.plant.health,
      lastWater: props.plant.lastWater,
      age: props.plant.age,
      happiness: props.plant.happiness,
      messages: props.plant.messages,
      nextWater: 0,
      messageType: "",
      message: ""
    };

    this.waterPlant = this.waterPlant.bind(this);
    this.dateDiff = this.dateDiff.bind(this);
    this.handleUpdatePlant = this.handleUpdatePlant.bind(this);
    this.calculateHealth = this.calculateHealth.bind(this);
    this.updateHealth = this.updateHealth.bind(this);
    this.updateNextWater = this.updateNextWater.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
  }

  componentWillMount() {
    this.props.fetchPlant(this.props.connectionId).then(() =>{
      this.setState({
        health: this.calculateHealth(),
        nextWater: this.updateNextWater(this.props.plant.lastWater)
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    let { messages } = nextProps.plant;
    this.setState({
      messages
    });
  }

  handleUpdatePlant() {
    const { name, health, lastWater, age, happiness, messages } = this.state;
    const plant = { name, health, lastWater, age, happiness, messages };

    this.props.updatePlant(this.props.connectionId, plant);
  }

  dateDiff(){
    let today = Date.now();
    let lastWater = new Date(this.state.lastWater).getTime();
    let lapsedTime =  parseInt((today - lastWater) / (1000 * 60 * 60 * 24));
    return lapsedTime;
  }

  calculateHealth() {
    let decreasedHealth = this.dateDiff() * 20;
    let tempHealth = this.props.plant.health - decreasedHealth;
    if (tempHealth < 0) {tempHealth = 0;}
    return tempHealth;
  }

  waterPlant() {
    let now = new Date(Date.now());
    if (this.state.nextWater > now ) {
      this.displayMessage("full", 900);
    } else {
      this.displayMessage("", 900);
      this.setState({
        water: true,
        health: this.updateHealth(),
        lastWater: now,
        nextWater: this.updateNextWater(),
      });
      setTimeout(()=>{
        this.setState({
          water: false
        });
      }, 5000);
    }
    this.handleUpdatePlant();
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

  updateHealth() {
    let health = this.state.health + 10;
    if (health > 100) {health = 100;}
    return health;
  }

  updateNextWater(lastWater) {
    let nextWater = new Date(Date.now());
    if (lastWater) nextWater.setTime(new Date(lastWater).getTime());
    nextWater.setMinutes(nextWater.getMinutes() + 5);
    return nextWater;
  }

  displayMessage(type, time) {
    const { messages } = this.props.plant;
    const { currentUser } = this.props;
    const message = messages.for[currentUser.firstName];
    this.setState ({
      messageType: type,
      message
    });
    let timeout = setTimeout(()=>{
      this.setState({
        messageType: ""
      });
    }, time);
  }

  render() {
    let water = this.state.water ? animateSprite(WATER, 4, 500, 100, 100) : (<Text> </Text>);
    let background = this.getBackground();
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <Image source={background}
            style={{
              width,
              height: height * 0.90,
              resizeMode: 'stretch'
              }}/>
        </View>
        <View style={styles.healthbar}>
          <Healthbar health={this.state.health} />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={this.waterPlant}
            style={styles.waterIcon}
          >
            <Image
              style={styles.roundedIcon}
              source={require('../../assets/icons/waterIcon.png')}
            />
          </TouchableOpacity>
          <InputModal />
        </View>
        <View style={styles.centerBody}>
          <View>
            <PlantMessage
            message={this.state.message}
            messageType={this.state.messageType}
            partner={this.props.partner}
            name={this.props.plant.name} />
          </View>
          <TouchableWithoutFeedback
            style={styles.wrapper}
            onPress={
              () => {Vibration.vibrate([0, 500, 200, 500]);
                //display optional message
                this.displayMessage("secret", 1100);
              }
            }>
            <View style={styles.plant}>
              {/* don't set timer below 1001 */}
              {animateSprite(PLANT, 2, 1300 - (this.state.health * 10), 550, height * 0.70)}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.water}>
            {water}
          </View>
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
  centerBody: {
    left: (Dimensions.get('window').width/2) - 100,
    top: (Dimensions.get('window').height) - (Dimensions.get('window').height*.76),
    height: 300,
    width: 200,
  },
  buttons: {
    position: 'absolute',
    zIndex: 1,
    height: 150,
    width: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    right: Dimensions.get('window').width*.02,
    top: Dimensions.get('window').height*0.14
  },
  background: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
  },
  healthbar: {
    top: Dimensions.get('window').height*.1,
    left: Dimensions.get('window').width*.04
  },
   plant: {
     alignSelf: 'center',
     backgroundColor: 'transparent',
   },
   water: {
     position: 'absolute',
     alignSelf: 'center'
   },
   waterIcon: {
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
    borderRadius: 30,
   },
   roundedIcon: {
    right: 10,
    bottom: 10,
    width: 80,
    height: 80,
    resizeMode: 'contain'
  }
});

export default Plant;
