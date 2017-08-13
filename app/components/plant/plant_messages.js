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


class plantMessage extends React.Component {
  constructor(props) {

    // this.state = {
    //   styleName: "default"
    // }

    this.displayMessage = this.displayMessage.bind(this);
    this.full = this.full.bind(this);
    this.greeting = this.greeting.bind(this);
  }

  // this.props.full
  //this.props.greeting

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

  // displayDisableMessage(message) {
  //   this.setState ({
  //     message: message
  //   });
  //   setTimeout(()=>{
  //     this.setState({
  //       message: ""
  //     });
  //   }, 700);
  // }

  default() {
    return (<Text></Text>);
  }

  full() {
    return (
      <Text style={styles.full}>
        "I'm full!"
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
          {this.displayMessage}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  full: {
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


export default plantMessage;
