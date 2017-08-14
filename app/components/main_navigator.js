import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import MainContainer from './main_container';
import { MenuContext } from 'react-native-popup-menu';



class MainNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <MenuContext>
          <NavigatorIOS
            initialRoute={{
              component: MainContainer,
              title: 'Main',
              navigationBarHidden: true
            }}
            style={{flex: 1}}/>
        </MenuContext>

    );
  }

}

export default MainNavigator;
