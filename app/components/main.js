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
import UserProfileContainer from './user_profile/profile_container';
import Plant from './plant';
import Chat from './chat';
import {unauthUser, getTodos, deleteTodo, setTodos} from '../actions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

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
    this.redirectToTodos = this.redirectToTodos.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
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

  redirectToTodos() {
    this.props.navigator.push({
      component: TodoList,
      title: 'TodoList',
      navigationBarHidden: true
    })
  }

  redirectToProfile() {
    this.props.requestPair(this.props.currentUserId);
    this.props.requestConnection(this.props.connectionId);
    this.props.navigator.push({
      component: UserProfileContainer,
      title: 'User Profile',
      navigationBarHidden: true
    })
  }

  handleLogOut() {
    this.props.unauthUser();
  }

  render() {
    return (
      <View style = {styles.container}>
        <ScrollView style = {styles.scrollView}>
          { this.state.plant ? <Plant/> : null }
          { this.state.chat ? <Chat/> : null }
          { this.state.todo ? <TodoList/> : null }
        </ScrollView>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={this.togglePlantTab}>
            <Icon name='flower' size={45} color={this.state.plant ? "white" : "#0c9258" }/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleChatTab}>
            <Icon name='message-processing' size={45} color={this.state.chat ? "white" : "#0c9258" }/>
          </TouchableOpacity>
          <Menu>
           <MenuTrigger>
             <Icon name='chevron-up' size={45} color="#0c9258"/>
           </MenuTrigger>
             <MenuOptions>
               <MenuOption onSelect={this.handleLogOut} text='Log Out' />
               <MenuOption onSelect={this.redirectToTodos} text='To-dos' />
               <MenuOption onSelect={this.redirectToProfile} text='Profile' />
             </MenuOptions>
         </Menu>
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

var mapStateToProps = (state) => {
  return {
    state
  }
}

export default Main;
