import React from 'react';
import {
  Text
} from 'react-native';

class Header extends React.Component {

  render() {
    return(
      <Text style={{fontSize: 24, color: '#208e4e', textAlign: 'center', fontWeight: 'bold' }}>
        {this.props.children}
      </Text>
    );
  }
}

export default Header;
