import React, { Component } from 'react';
import {connect} from 'react-redux';
import {requestPair} from '../../user_actions';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import Dimensions from 'Dimensions';

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
    .then((userId) =>{
      console.log(userId, "user joined!");
      this.socket.emit('userJoined', userId);
      this.setState({ userId });
    });
  }

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  onSend(messages=[]) {
    console.log(messages[0], "emitting message!");
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  render() {
    var user = { _id: this.props.userId || -1 };
    return (
      <View style={{height: Dimensions.get('window').height-55}}>

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
    console.log(this.props.userId);
  }
}

var mapStateToProps = (state) => {
  console.log(state);
  return {
    messages: [],
    userId: state.users.currentUser._id
  };
};

export default connect(mapStateToProps)(Chat);
