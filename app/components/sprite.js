import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

const IMAGES = {
  image0: require('../assets/spritesheets/braid/braid_frame00.png'),
  image1: require('../assets/spritesheets/braid/braid_frame01.png'),
  image2: require('../assets/spritesheets/braid/braid_frame02.png'),
  image3: require('../assets/spritesheets/braid/braid_frame03.png'),
  image4: require('../assets/spritesheets/braid/braid_frame04.png'),
  image5: require('../assets/spritesheets/braid/braid_frame05.png'),
  image6: require('../assets/spritesheets/braid/braid_frame06.png'),
  image7: require('../assets/spritesheets/braid/braid_frame07.png'),
  image8: require('../assets/spritesheets/braid/braid_frame08.png'),
  image9: require('../assets/spritesheets/braid/braid_frame09.png'),
  image10: require('../assets/spritesheets/braid/braid_frame10.png'),
  image11: require('../assets/spritesheets/braid/braid_frame11.png'),
  image12: require('../assets/spritesheets/braid/braid_frame12.png'),
  image13: require('../assets/spritesheets/braid/braid_frame13.png'),
  image14: require('../assets/spritesheets/braid/braid_frame14.png'),
  image15: require('../assets/spritesheets/braid/braid_frame15.png'),
  image16: require('../assets/spritesheets/braid/braid_frame16.png'),
  image17: require('../assets/spritesheets/braid/braid_frame17.png'),
  image18: require('../assets/spritesheets/braid/braid_frame18.png'),
  image19: require('../assets/spritesheets/braid/braid_frame19.png'),
  image20: require('../assets/spritesheets/braid/braid_frame20.png'),
  image21: require('../assets/spritesheets/braid/braid_frame21.png'),
  image22: require('../assets/spritesheets/braid/braid_frame22.png'),
  image23: require('../assets/spritesheets/braid/braid_frame23.png'),
};



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
    }, 200);
    return (
      <View style={styles.container}>
        <Image 
          source={this.getImage(this.state.frame)}  
          style={styles.sprite}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#ccc'
  },
  sprite: {
    resizeMode: 'stretch'
  }
});

export default Sprite;
