import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';``
import SignUp from './signup';

class SignUpNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.handleBack} style={styles.back}>
            <Icon name="chevron-left" size={30} color='#12512d'/>
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.placeholder}></Text>
        </View>
        <SignUp navigator={this.props.navigator}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
    height: Dimensions.get('window').height*.1,
    left: 0,
    top: 0,
    width: '100%',
  },
  back:{
    width: '15%',
    alignItems: 'center',
    top: Dimensions.get('window').height*.04,
  },
  title: {
    width: '70%',
    textAlign: 'center',
    top: Dimensions.get('window').height*.04,
    height: Dimensions.get('window').height*.06,
    fontSize: 20,
    color: '#12512d',
  },
  placeholder: {
    width: '15%'
  }
});

export default SignUpNavigator;
