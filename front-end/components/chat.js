import React, { Component } from 'react';
import {connect} from 'react-redux';
import {requestPair} from '../actions';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';
import io from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import Dimensions from 'Dimensions';
const API_URL = 'https://safe-peak-55084.herokuapp.com';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.giftedUser = this.giftedUser.bind(this);

    this.socket = io(API_URL);
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  componentWillMount() {
    this.props.requestPair(this.props.users.currentUser._id);
  }

  determineUser() {
    let userId = this.props.users.currentUser._id;
    this.socket.emit('userJoined', userId);
  }

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  onSend(messages=[]) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  giftedUser() {
    if (!this.props.users.currentUser) { return (<View></View>); }
    return {
      _id: this.props.users.currentUser._id.toString(),
      name: this.props.users.currentUser.firstName,
      avatar: this.props.users.currentUser.imageUrl,
      connectionId: this.props.users.currentUser.connectionId
    };
  }

  render() {
    let {currentUser, partner} = this.props.users;
    console.disableYellowBox = true;
    if (!currentUser || !partner ) { return null; }
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.partner}>
          <Image
            style={styles.profileImage}
            resizeMode='cover'
            source={{
              uri: partner.imageUrl
            }}
            />
          <Text style={styles.title}>{partner.firstName} {partner.lastName}</Text>
        </View>
        </View>
        <View style={styles.giftedChat}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={this.giftedUser()}
            renderBubble={this.renderBubble.bind(this)}
            />
        </View>
      </View>
    );
  }

  renderBubble(props) {
    return ( <Bubble {...props}
      wrapperStyle={{
          left: {
            backgroundColor: '#F5F5F5',
          },
          right: {
            backgroundColor: '#208e4e'
          }
        }} />
    );
  }

  _storeMessages(messages) {
    this.setState(Object.assign({}, {messages: messages.concat(this.state.messages)}));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 5
  },
  topBar: {
    position: 'absolute',
    height: Dimensions.get('window').height*.08,
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: '#2ecc71'
  },
  partner: {
    top: Dimensions.get('window').height*.01,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  giftedChat: {
    top: Dimensions.get('window').height*.08,
    height: Dimensions.get('window').height*.82
  },
  profileImage: {
    top: Dimensions.get('window').height*.015,
    alignSelf: 'flex-start',
    width: 30,
    height: 30,
    borderRadius: 15
  }
});

const mapStateToProps = (state) => {
  return {users: state.users};
};

const mapDispatchToProps = dispatch => ({
  requestPair: (userId) => dispatch(requestPair(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
