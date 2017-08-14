import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

import Dimensions from 'Dimensions';
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
          <View style={styles.topNav}>
            <TouchableOpacity onPress={this.handleBack}>
              <Icon name="chevron-left" size={24} color="white"/>
            </TouchableOpacity>
            <Text style={styles.title}>Edit Profile</Text>
          </View>
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
    backgroundColor: 'transparent',
    paddingLeft: Dimensions.get('window').width*.3
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Dimensions.get('window').width*.03,
    paddingRight: Dimensions.get('window').width*.03,
    top: Dimensions.get('window').height*.03,
  },
  topBar: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    height: Dimensions.get('window').height*.08,
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: '#2ecc71'
  }
});


module.exports = EditProfileNavigator;
