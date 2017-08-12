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
    this.state = {
      messages: []
    };

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
    console.log("onReceivedMessage");
    this._storeMessages(messages);
  }

  onSend(messages=[]) {

    console.log(messages[0], "emitting message! onSend");
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  render() {
    var user = { _id: this.props.userId, connectionId: this.props.connectionId };
    return (

      <View style={{height: Dimensions.get('window').height-75}}>

        <Text>Hi</Text>

        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={user}
          />
      </View>
    );
  }

  _storeMessages(messages) {
    this.setState(Object.assign({}, {messages: this.state.messages.concat(messages)}));
    console.log(this);
  }
}

var mapStateToProps = (state) => {
  console.log(state);
  return {
    userId: state.users.currentUser._id,
    connectionId: state.users.currentUser.connectionId
  };
};

export default connect(mapStateToProps)(Chat);
