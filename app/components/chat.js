import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import Dimensions from 'Dimensions';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = io('http://localhost:3000');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  determineUser() {
    let userId = this.props.userId;
    console.log(userId, "user joined!");
    this.socket.emit('userJoined', userId);
    this.setState({ userId });
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
    let oldMessages = this.props.messages;
    this.setState({messages: messages});
    console.log(this);
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
