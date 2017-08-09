import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';

import Sprite from './sprite';
import TodoList from './todo_list';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.navToPlant = this.navToPlant.bind(this);
    this.navToTodo = this.navToTodo.bind(this);
  }

  navToPlant() {
    this.props.navigator.push({
      component: Sprite,
      title: "Plant",
      navigationBarHidden: true
    });
  }
  navToTodo() {
    this.props.navigator.push({
      component: TodoList,
      title: "Todo",
      navigationBarHidden: true
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.navToPlant}>
          <Icon name='flower' size={45} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navToTodo}>
          <Icon name='format-list-bulleted' size={45} color="white"/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: '#2ecc71',
    flexDirection: 'row'
  },
});

export default NavBar;