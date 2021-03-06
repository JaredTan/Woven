import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';


class PlantMessage extends React.Component {
  constructor(props) {
    super(props);

    this.displayMessage = this.displayMessage.bind(this);
    this.full = this.full.bind(this);
    this.greeting = this.greeting.bind(this);
    this.default = this.default.bind(this);
  }

  displayMessage() {
    const { messageType, message } = this.props;

    if (messageType === "full") {
      return this.full();
    } else if (messageType === "secret") {
      return message ? this.default(message) : this.greeting();
    } else {
      return this.blank();
    }

  }

  blank() {
    return (<Text></Text>);
  }

  default(message) {
    return (
      <Image
         style={styles.dialogueBox}
         source={require('../../assets/plant/dialogueBox.png')}
       >
        <View style={styles.secretContainer}>
            <Text style={styles.secret}
              numberOfLines={6}>
              {this.props.partner.firstName} says, "{message}"
            </Text>
        </View>
      </Image>
    );
  }

  full() {
    return (
      <Image
        style={styles.dialogueBox}
        source={require('../../assets/plant/dialogueBox.png')}
      >
        <Text style={styles.full}>
          Greggles says "I'm full!"
        </Text>
      </Image>
    );
  }

  greeting() {
    return (
      <Image
        style={styles.dialogueBox}
        source={require('../../assets/plant/dialogueBox.png')}
      >
      <View style={styles.secretContainer}>
        <Text style={styles.greeting}>
          {this.props.name} says Hi!
        </Text>
      </View>
      </Image>
    );
  }

  render() {
    return (
      <View style={styles.test}>
        {this.displayMessage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    height: 0
  },
  dialogueBox:{
    zIndex: -1,
    opacity: .45,
    right: 170,
    bottom: 135,
    height: 350,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secretContainer: {
    width: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  secret: {
    position: 'absolute',
    textAlign: 'center',
    flexWrap: 'wrap',
    width: 155,
    flexGrow: 1,
    alignSelf: 'center',
    fontSize: 17,
    opacity: .9,
    paddingBottom: 18
  },
  greeting: {
    position: 'absolute',
    fontSize: 17,
    opacity: .85,
    paddingBottom: 13
  },
  full: {
   position: 'absolute',
   color: '#D6502E',
   alignSelf: 'center',
   paddingBottom: 13,
   fontSize: 14
  }
});


export default PlantMessage;
