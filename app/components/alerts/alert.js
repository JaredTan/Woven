import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import {removeAlert} from '../../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveAlert = this.handleRemoveAlert.bind(this);

  }

  handleRemoveAlert() {
    let {alert, dispatch} = this.props;
    dispatch(removeAlert(alert.id));
  }

  render() {
    let {alert} = this.props;
        return (
          <TouchableWithoutFeedback onPress={this.handleRemoveAlert}>
            <View style={styles.container2}>
              <Text style={styles.text}>
                {alert.text}
              </Text>
              <Icon name="close" size={15} color='#2ecc71'/>
            </View>
          </TouchableWithoutFeedback>
        );
    }


}


const styles = StyleSheet.create({
  container2: {
    flex: 1,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    backgroundColor: '#cdf9d8',
    borderColor: '#bbf7ca',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: "gray",
    backgroundColor: 'transparent',
    padding: 5
  }
});

export default connect()(Alert);
