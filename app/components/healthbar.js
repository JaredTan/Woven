import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS,
  Animated,
  Dimensions
} from 'react-native';


class Healthbar extends React.Component {
  constructor(props) {
    super(props);

    this.color;
    if (props.health > 75) {
      this.color = '#00EE10';
    } else if (props.health > 35) {
      this.color = '#FFFF33';
    } else {
      this.color = '#EE1122';
    }

    this.state = {
      width: (this.props.health % 101) * 2,
      color: this.color
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.health > 75) {
      this.color = '#00EE10';
    } else if (nextProps.health > 35) {
      this.color = '#FFFF33';
    } else {
      this.color = '#EE1122';
    }

    this.setState({
      width: (nextProps.health % 101) * 2,
      color: this.color
    });
  }


  render() {
    let width = this.state.width;
    let color = this.state.color;
    return(
      <View style={styles.healthbar}>
      <Text style={styles.text}>
        Health
      </Text>
        <View style={health({ width, color })}>
        </View>
      </View>
    );
  }
}

function health(options) {
  return {
    width: options.width,
    backgroundColor: options.color,
    height: 13,
    borderRadius: 20,
  };
}

const styles = StyleSheet.create({
  healthbar: {
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
    width: 204,
    height: 17,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 13,
  },
  text: {
    position: 'absolute',
    bottom: 17,
    fontWeight: 'bold',
    color: 'black',
  }
});


export default Healthbar;
