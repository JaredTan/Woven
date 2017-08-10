import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';


import IMAGES from '../assets/spritesheets/sprites';
import BACKGROUND from '../assets/spritesheets/background/background';


class Sprite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plantframe: 0,
      bgframe: 0,
    };

    this.getImage = this.getImage.bind(this);
  }

  getImage(arr, num) {
    return arr['image' + num];
  }

  render() {
    // setTimeout(() => {
    //   this.setState({
    //     plantframe: (this.state.plantframe + 1) % 24
    //   });
    // }, 200);
    //
    // setTimeout(() => {
    //    this.setState({
    //      bgframe: (this.state.bgframe + 1) % 1
    //    });
    //  }, 3600); //one hour

    return (
      <View style={styles.container}>
        <View style={styles.backgroundlayer}>
          <Image
            source={this.getImage(BACKGROUND, this.state.bgframe)}
            style={styles.background}
            />
        </View>
        <View style={styles.overlay}>
          <Image
            source={this.getImage(IMAGES, this.state.plantframe)}
            style={styles.plant}
            />
        </View>
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
  backgroundlayer: {
    position: 'absolute',
     alignSelf: 'center',
     justifyContent: 'center',
     resizeMode: 'cover',
    },
    background: {
     alignSelf: 'center',
     justifyContent: 'center',
     resizeMode: 'cover',
   },
   plant: {
    //  bottom: '15',
    //  alignSelf: 'center',
    //  justifyContent: 'center',
     backgroundColor: 'transparent',
   },
   overlay: {
     alignSelf: 'center',
     justifyContent: 'center',
     backgroundColor: 'transparent',
    }
});

export default Sprite;
