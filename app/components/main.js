import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoList from './todo_list';
import Sprite from './sprite';
import {connect} from 'react-redux';
import Chat from './chat';
import {unauthUser, getTodos, deleteTodo, setTodos} from '../actions';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plant: true,
      chat: false,
      todo: false
    }

    this.resetTabs = this.resetTabs.bind(this);
    this.togglePlantTab = this.togglePlantTab.bind(this);
    this.toggleChatTab = this.toggleChatTab.bind(this);
    this.toggleTodoTab = this.toggleTodoTab.bind(this);
  }

  resetTabs(){
    this.setState({
      plant: false,
      chat: false,
      todo: false
    })
  }

  togglePlantTab() {
    this.resetTabs();
    this.setState({plant: true});
  }

  toggleChatTab() {
    this.resetTabs();
    this.setState({chat: true});
  }

  toggleTodoTab() {
    this.props.navigator.push({
      component: TodoList,
      title: 'TodoList',
      navigationBarHidden: true
    })
  }

  handleLogOut() {
    this.props.dispatch(unauthUser);
  }

  render() {
    console.log(this.state,'state');
    return (
      <View style = {styles.container}>
        <ScrollView style = {styles.scrollView}>
          { this.state.plant ? <Sprite/> : null }
          { this.state.chat ? <Chat/> : null }
          { this.state.todo ? <TodoList/> : null }
        </ScrollView>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={this.togglePlantTab}>
            <Icon name='flower' size={45} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleChatTab}>
            <Icon name='wechat' size={45} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleTodoTab}>
            <Icon name='format-list-bulleted' size={45} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleLogOut}>
            <Icon name='window-close' size={45} color="white"/>
          </TouchableOpacity>
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
  scrollView: {
  },
  navBar: {
    height: 55,
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default connect(null)(Main);
