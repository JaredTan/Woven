import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  NavigatorIOS,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoList from './todo_list';
import UserProfileContainer from './user_profile/profile_container';
import PlantContainer from './plant_container';
import Chat from './chat';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// import {messageIcon, navBarImage, plantIcon, profileIcon, toDoIcon} from '../assets/navbar';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: true,
      chat: false,
      todo: false
    };

    this.resetTabs = this.resetTabs.bind(this);
    this.togglePlantTab = this.togglePlantTab.bind(this);
    this.toggleChatTab = this.toggleChatTab.bind(this);
    this.toggleTodoTab = this.toggleTodoTab.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  resetTabs(){
    this.setState({
      plant: false,
      chat: false,
      todo: false
    });
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

  redirectToProfile() {
    this.props.requestPair(this.props.currentUserId).then( () => {
      this.props.navigator.push({
        component: UserProfileContainer,
        title: 'User Profile',
        navigationBarHidden: true
      });
    });
  }

  handleLogOut() {
    this.props.unauthUser();
  }


    render() {
      return (
        <View style={styles.container}>
          <View style={styles.component}>
            <View>
              { this.state.plant ? <PlantContainer/> : null }
              { this.state.chat ? <Chat currentUserId={this.props.currentUserId}/> : null }
              { this.state.todo ? <TodoList/> : null }
            </View>
          </View>
          <View style={styles.navBar}>
            <Image
              source={require('../assets/navbar/navbar.png')}
              style={styles.navBackground}>
            <TouchableOpacity onPress={this.togglePlantTab}>
              <Image
                source={require('../assets/navbar/plantIcon.png')} opacity={this.state.plant ? 1 : .5 }/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleChatTab}>
              <Image
                source={require('../assets/navbar/messageIcon.png')} opacity={this.state.chat ? 1 : .5 }/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleTodoTab}>
              <Image
                source={require('../assets/navbar/todoIcon.png')} opacity={this.state.todo ? 1 : .5 }/>
            </TouchableOpacity>
            <Menu>
             <MenuTrigger>
               <Image
                 source={require('../assets/navbar/profileIcon.png')} opacity={ .5 }/>
             </MenuTrigger>
               <MenuOptions>
                 <MenuOption onSelect={this.handleLogOut} text='Log Out' />
                 <MenuOption onSelect={this.redirectToProfile} text='Profile' />
               </MenuOptions>
           </Menu>
           </Image>
          </View>
        </View>
      );
    }
  }
  // require('../assets/navbar/waterIcon.png')

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    component: {
      flex: 9
    },
    // navBar: {
    //   flex: 1,
    //   backgroundColor: '#2ecc71',
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-around'
    // },
    navBackground: {
      zIndex: -1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });


  export default Main;
