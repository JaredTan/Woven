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
    this.resetTabs();
    this.setState({todo: true});
  }

  render() {
    console.log(this.state,'state');
    return (
      <View style = {styles.container}>
        <ScrollView style = {styles.scrollView}>
          { this.state.plant ? <Sprite/> : null }
          { this.state.chat ? null : null }
          { this.state.todo ? <TodoList/> : null }
        </ScrollView>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={this.togglePlantTab}>
            <Icon name='flower' size={45} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleTodoTab}>
            <Icon name='format-list-bulleted' size={45} color="white"/>
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
    height: 100,
    backgroundColor: '#2ecc71',
    flexDirection: 'row'
  }
});

module.exports = Main;
