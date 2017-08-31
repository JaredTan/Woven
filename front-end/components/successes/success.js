import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import {removeSuccess} from '../../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class Success extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveSuccess = this.handleRemoveSuccess.bind(this);

  }

  handleRemoveSuccess() {
    let {success, dispatch} = this.props;
    dispatch(removeSuccess(success.id));
  }

  render() {
    let {success} = this.props;
        return (
          <TouchableWithoutFeedback onPress={this.handleRemoveSuccess}>
            <View style={styles.container2}>
              <Text style={styles.text}>
                {success.text}
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
    borderRadius: 5,
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

export default connect()(Success);
