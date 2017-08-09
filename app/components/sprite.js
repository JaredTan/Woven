import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

import {
  Loop,
  Stage
} from 'react-game-kit/native';

class Sprite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: 0,
      tick: 0
    };
  }


  render() {
    setTimeout(() => {
      this.setState({
        frame: this.state.frame + 1
      });
    }, 5000);
    return (
      <View style={styles.container}>
        <Text>
          Hello {this.state.frame}
          <Image source={require('../assets/spritesheets/braid.png')}/>
        </Text>
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
});

export default Sprite;
