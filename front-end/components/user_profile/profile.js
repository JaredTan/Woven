import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhotoUpload from 'react-native-photo-upload';
import {connect} from 'react-redux';
import EditProfileNavigator from './edit_profile_navigator';
import moment from 'moment';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
    this.redirectToEdit = this.redirectToEdit.bind(this);
  }

  componentDidMount() {
    this.props.resetPair(this.props.currentUserId);
    this.props.requestPair();
  }

  redirectToEdit() {
    this.props.requestPair().then(() => {
      this.props.navigator.push({
        component: EditProfileNavigator,
        title: 'Edit Profile',
        navigationBarHidden: true
      });
    });
  }

  handleBack() {
    this.props.navigator.pop();
  }

  render() {
    let {currentUser, partner} = this.props.users;
    let {connectionId } = this.props;
    if (!currentUser || !partner) {
      return null;
    }
    return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={this.handleBack}>
            <Icon name="chevron-left" size={24} color="white"/>
          </TouchableOpacity>
          <Text style={styles.title}>
            Profile
          </Text>
          <TouchableOpacity onPress={this.redirectToEdit}>
            <Icon name="pencil" size={20} color="white"/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            resizeMode='cover'
            source={{
              uri: currentUser.imageUrl
            }}
          />
          <Text style={styles.name}>{currentUser.firstName} {currentUser.lastName}</Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Birthday: </Text>
              {moment(currentUser.birthday).format('LL')}
            </Text>
        </View>

        <View style={styles.anniversary}>
          <View style={{width: '90%', marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'gray', borderBottomWidth: 1,}}/>
          <Text style={{fontWeight: 'bold'}}>Anniversary:  {moment(currentUser.anniversary).format('LL')}</Text>
          <View style={{width: '90%', marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderBottomColor: 'gray', borderBottomWidth: 1,}}/>
        </View>

        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            resizeMode='cover'
            source={{
              uri: partner.imageUrl
            }}
          />
          <Text style={styles.name}>Your partner: {partner.firstName} {partner.lastName}</Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Birthday: </Text>
             {moment(partner.birthday).format('LL')}
            </Text>
        </View>

      </View>
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
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 50,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  info: {
    top: Dimensions.get('window').height*.08,
    height: Dimensions.get('window').height*.92,
    paddingTop: Dimensions.get('window').height*.03,
    paddingBottom: Dimensions.get('window').height*.05,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  header: {
    alignItems: 'center',
  },
  profileImage: {
    width: Dimensions.get('window').width*.4,
    height: Dimensions.get('window').width*.4,
    borderRadius: Dimensions.get('window').width*.2,
    borderColor: 'gray',
    borderWidth: .5
  },
  anniversary: {
    alignItems: 'center'
  }
});


export default UserProfile;
