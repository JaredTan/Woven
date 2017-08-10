import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS,
  Animated
} from 'react-native';

import NavBar from './navbar';
import IMAGES from '../assets/spritesheets/sprites';

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprite: new Animated.Value(0),  // Initial value for opacity: 0
    };
    this.increaseSize = this.increaseSize.bind(this);
    this.resetSize = this.resetSize.bind(this);
  }

  componentDidMount() {
    this.increaseSize();                     // Starts the animation
  }

  resetSize() {
    this.setState({
      sprite: new Animated.Value(0)
    });
    this.increaseSize();
  }

  increaseSize() {
    Animated.timing(                  // Animate over time
      this.state.sprite,            // The animated value to drive
      {
        toValue: 100,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start(this.resetSize);  
  }

  render() {
    let { sprite } = this.state;

    return (
      <Animated.Text                 // Special animatable View
        style={{
          fontSize: sprite,         // Bind opacity to animated value
        }}
      >
          123
      </Animated.Text>
    );
  }
}


class Sprite extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Animation>
        </Animation>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'blue',
    alignItems: 'stretch',
  },
  sprite: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'center'
  }
});

export default Sprite;
