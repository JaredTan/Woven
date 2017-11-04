import React from 'react';
import {
  Text
} from 'react-native';

class ButtonTextStyle extends React.Component {

  render() {
    return(
      <Text style={{fontSize: 12, fontWeight: 'bold', color: '#12512d', textAlign: 'center'}}>
        {this.props.children}
      </Text>
    );
  }
}

export default ButtonTextStyle;
