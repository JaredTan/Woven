import React, { Component } from 'react';
import {connect} from 'react-redux';
import {requestPair} from '../actions';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import io from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
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
    this.giftedUser = this.giftedUser.bind(this);

    this.socket = io('http://localhost:3000');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  componentWillMount() {
    this.props.requestPair(this.props.users.currentUser._id);
  }

  determineUser() {
    let userId = this.props.users.currentUser._id;
    (userId, "user joined!");
    this.socket.emit('userJoined', userId);
    this.setState({ userId });
  }

  onReceivedMessage(messages) {
    ("onReceivedMessage");
    this._storeMessages(messages);
  }

  onSend(messages=[]) {

    (messages[0], "emitting message! onSend");
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
    if (!this.props.users) { return null; }
    return (
      <View style={styles.chatbox}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={this.giftedUser()}
          renderBubble={this.renderBubble.bind(this)}
          />
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
            backgroundColor: '#2ecc71'
          }
        }} />
    );
  }

  _storeMessages(messages) {
    this.setState(Object.assign({}, {messages: messages.concat(this.state.messages)}));
    (this);
  }
}

const styles = StyleSheet.create({
  chatbox: {
    height: Dimensions.get('window').height-75
  }
});

const mapStateToProps = (state) => {
  return {users: state.users};
};

const mapDispatchToProps = dispatch => ({
  requestPair: (userId) => dispatch(requestPair(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
