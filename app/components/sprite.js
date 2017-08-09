import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

import NavBar from './navbar';
import IMAGES from '../assets/spritesheets/sprites';


class Sprite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: 0,
      tick: 0
    };

    this.getImage = this.getImage.bind(this);
  }
  
  getImage(num) { 
    return IMAGES['image' + num];
  }
  

  render() {
    setTimeout(() => {
      this.setState({
        frame: (this.state.frame + 1) % 24
      });
    }, 100);
    return (
      <View style={styles.container}>
        <Image 
          source={this.getImage(this.state.frame)}  
          style={styles.sprite}
          />
        <NavBar navigator={this.props.navigator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
