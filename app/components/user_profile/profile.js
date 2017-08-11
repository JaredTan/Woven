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
import PhotoUpload from 'react-native-photo-upload';
import {connect} from 'react-redux';
import NavBar from '../navbar';
// var cloudinary = require('cloudinary');

class UserProfile extends React.Component {
  constructor(props) {
    super(props)

    this.onBack = this.onBack.bind(this);
  }

  redirectToLogin() {
    this.props.navigator.push({
      component: EditProfile,
      title: 'Edit Profile',
      navigationBarHidden: true
    })
  }

  onBack() {
    this.props.navigator.pop();
  }

  render() {
    let {currentUser, partner} = this.props.users;
    let {connectionId } = this.props;
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
          <Icon name="pencil" size={20} color="white"/>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
         <Image
           style={{
             paddingVertical: 30,
             width: 150,
             height: 150,
             borderRadius: 75
           }}
           resizeMode='cover'
           source={{
             uri: currentUser.imageUrl
           }}
         />
       <View style={styles.first}>
         <Text>You: </Text>
         <Text style={styles.name}>{currentUser.firstName}</Text>
         <Text style={styles.name}>{currentUser.lastName}</Text>
       </View>
       <View style={styles.last}>
         <Text>Partner:</Text>
         <Text style={styles.name}>{partner.firstName}</Text>
         <Text style={styles.name}>{partner.lastName}</Text>
       </View>

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
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  first: {
    flexDirection: 'row'
  },
  last: {
    flexDirection: 'row'
  },
  name: {
    marginLeft: 2
  },
  info: {
    flex: .7,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 42
  }
});


export default UserProfile;
