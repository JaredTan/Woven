import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import NavBar from '../navbar';


class UserProfile extends React.Component {
  constructor(props) {
    super(props)

    this.onBack = this.onBack.bind(this);
  }

  onBack() {
    this.props.navigator.pop();
  }

  render() {
    console.log(this.props,'profile');
    let { currentUser } = this.props.users;
    if (!currentUser) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.onBack}>
            <Icon name="chevron-left" size={20} color="white"/>
          </TouchableOpacity>
          <Text style={styles.title}>
            Profile
          </Text>
          <TouchableOpacity>
            <Text>?</Text>
          </TouchableOpacity>
        </View>
        <Text>Logged in as {currentUser.email}</Text>
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
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20
  }
});


export default UserProfile;
