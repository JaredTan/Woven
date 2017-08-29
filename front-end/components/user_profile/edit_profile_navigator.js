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
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.topNav}>
            <TouchableOpacity onPress={this.handleBack}>
              <Icon name="chevron-left" size={20} color="white"/>
            </TouchableOpacity>
            <Text style={styles.title}>Edit Profile</Text>
            <Icon name="chevron-left" size={20} color="#2ecc71"/>
          </View>
        </View>
        <EditProfile navigator={this.props.navigator}/>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    position: 'absolute',
    zIndex: 1,
    height: Dimensions.get('window').height*.08,
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: '#2ecc71'
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Dimensions.get('window').width*.03,
    paddingRight: Dimensions.get('window').width*.03,
    top: Dimensions.get('window').height*.03,
  },
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  }
});


module.exports = EditProfileNavigator;