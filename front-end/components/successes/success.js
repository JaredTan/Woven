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
    let {success} = this.props;
    this.props.removeSuccess(success.id);
  }

  render() {
    let {success} = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.handleRemoveSuccess}>
        <View style={styles.container}>
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
  container: {
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

const mapDispatchToProps = dispatch => {
  return {
    removeSuccess: id => dispatch(removeSuccess(id))
  }
};

export default connect(null, mapDispatchToProps)(Success);
