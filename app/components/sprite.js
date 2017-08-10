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
        <View style={styles.backgroundlayer}>
          <Image
            source={this.getImage(BACKGROUND, this.state.bgframe)}
            resizeMode='cover'
            style={styles.backgroundImage}>
          </Image>
        </View>
        <View style={styles.overlay}>
          <Image
            source={this.getImage(IMAGES, this.state.plantframe)}
            style={styles.plant}
            />
        </View>
        <NavBar style={styles.navbar} navigator={this.props.navigator}/>
      </View>
    );
  }
}

// <View style={styles.overlay}>
//   <Image
//     source={this.getImage(IMAGES, this.state.plantframe)}
//     style={styles.plant}
//     />
// </View>

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    // zIndex: 1
  },
  backgroundlayer: {
    position: 'absolute',
    // left: 0,
    // right:0,
    // top: 0,
    // bottom: 0
  },
  background: {
    // alignSelf: 'center',
    // justifyContent: 'center',
    resizeMode: 'cover',
    // zIndex: 2
  },
  overlay: {
    // opacity: .90,
    backgroundColor: 'transparent'
    // alignSelf: 'center',
    // justifyContent: 'center',
    // resizeMode: 'cover',
    // zIndex: 1
  },
  plant: {
    alignSelf: 'center',
    justifyContent: 'center',
    // resizeMode: 'center',
    backgroundColor: 'transparent',
    // zIndex: 3
  },
});
export default Sprite;
