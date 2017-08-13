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
        )
    }


}


const styles = StyleSheet.create({
  container2: {
    flex: 1,
    width:200,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#cdf9d8',
    borderColor: '#bbf7ca',
    borderRadius: 50,
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    margin: 5
  },
  text: {
    color: "gray"
  }
});

export default connect()(Alert);
