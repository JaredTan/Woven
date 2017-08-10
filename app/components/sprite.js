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
import BACKGROUND from '../assets/spritesheets/background/background';


class Sprite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plantframe: 0,
      bgframe: 0,
      tick: 0
    };

    this.getImage = this.getImage.bind(this);
  }

  getImage(arr, num) {
    return arr['image' + num];
  }


  render() {
    setTimeout(() => {
      this.setState({
        plantframe: (this.state.plantframe + 1) % 24
      });
    }, 100);

    setTimeout(() => {
      this.setState({
        bgframe: (this.state.bgframe + 1) % 1
      });
    }, 3600); //one hour

    return (
      <View style={styles.container}>
        <Image
          source={this.getImage(BACKGROUND, this.state.bgframe)}
          style={zIndex: 1, styles.background}
          />
        <View style={styles.imagelayer}>
          <Image
            source={this.getImage(IMAGES, this.state.plantframe)}
            style={styles.plant}
            />
        </View>
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
    // zIndex: 3
  },
  background: {
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    // zIndex: 2
  },
  plant: {
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'center',
    backgroundColor: 'red',
    // zIndex: 1
  },
  imagelayer: {
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    // zIndex: 1
  }
});

export default Sprite;
