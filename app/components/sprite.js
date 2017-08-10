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
      frame: 0
    };
    this.increaseSize = this.increaseSize.bind(this);
    this.resetSize = this.resetSize.bind(this);
    this.incrementFrame = this.incrementFrame.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    this.increaseSize();                     // Starts the animation
    this.incrementFrame();
  }

  incrementFrame() {
    this.setState({
      frame: (this.state.frame + 1) % 24
    });
    requestAnimationFrame(this.incrementFrame);
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
        toValue: 24,                   // Animate to opacity: 1 (opaque)
        duration: 10000000,              // Make it take a while
      }
    ).start(this.resetSize);  
  }

  getImage(frame) {
    return IMAGES['image' + frame];
  }

  render() {
    let { sprite } = this.state;
    console.log(this.state.frame);
    return (
      <Animated.Image                 // Special animatable View
        source={this.getImage(this.state.frame)}
      >
      </Animated.Image>
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
