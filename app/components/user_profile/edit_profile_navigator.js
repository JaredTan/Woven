import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

import EditProfile from './edit_profile';

class EditProfileNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={this.handleBack}>
          <Icon name="chevron-left" size={30} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <Icon style={styles.filler} name="chevron-left" size={22} color="white"/>
      </View>
      <EditProfile navigator={this.props.navigator}/>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  filler: {
    color: '#2ecc71'
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  }
});


module.exports = EditProfileNavigator;
