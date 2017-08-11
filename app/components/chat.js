import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import Dimensions from 'Dimensions';


const USER_ID = '@userId';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient('http://localhost:3000/v1');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        this.socket.emit('userJoined', userId);
        this.setState({ userId });
      })
      .catch((e) => alert(e));
  }

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  onSend(messages=[]) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  render() {
    var user = { _id: this.props.userId || -1 };
    return (
      <View style={{height: Dimensions.get('window').height-55}}>

        <Text>Hi</Text>
        <GiftedChat
          messages={this.props.messages}
          onSend={this.onSend}
          user={user}
          />


        </View>
    );
  }

  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

var mapStateToProps = (state) => {
  return {
    messages: [],
    userId: state.user_id
  };
};

export default connect(mapStateToProps)(Chat);
