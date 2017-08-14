import React from 'react';
import {
  StyleSheet,
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
    let messageType = this.props.message;

    if (messageType === "full") {
      return this.full();
    } else if (messageType === "greeting") {
      return this.greeting();
    } else {
      return this.default();
    }

  }

  default() {
    return (<Text></Text>);
  }

  full() {
    return (
      <Text style={styles.full}>
        "Greggles says I'm full!"
      </Text>
    );
  }

  greeting() {
    return (
      <Text style={styles.greeting}>
        {this.props.name} says Hi!
      </Text>
    );
  }

  render() {
    return (
        <View>
          {this.displayMessage()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  greeting: {
    position: 'absolute',
    top: Dimensions.get('window').height*.15,
    right: Dimensions.get('window').height*.27,
    fontSize: 17,
    opacity: .6,
    padding: 13,
    backgroundColor: "#f2f2f2",
    transform: [{ rotate: '-20deg'}]
  },
  full: {
   position: 'absolute',
   color: '#f4967e',
   top: Dimensions.get('window').height*.15,
   right: Dimensions.get('window').height*.15,
   alignSelf: 'center',
   fontWeight: 'bold',
   fontSize: 14,
   letterSpacing: 1,
   shadowColor: '#FFF',
   shadowOffset: { width: 0, height: 0 },
   shadowOpacity: 0.5,
   shadowRadius: 1,
   transform: [{ rotate: '20deg'}]
  },
});


export default PlantMessage;
