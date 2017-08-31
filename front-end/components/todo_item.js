import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from 'react-native';
import Dimensions from 'Dimensions';

import {unauthUser, getTodos, deleteTodo, setTodos} from '../actions';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false
    };

    this.onDelete = this.onDelete.bind(this);
  }
    onDelete() {
      this.setState({deleting: true});
      this.props.dispatch(deleteTodo(this.props.connectionId, this.props.id));
    }

    render() {
      let renderDeleteButton = () => {
        if (!this.state.deleting) {
          return (
            <TouchableOpacity onPress={this.onDelete}>
              <Icon name="close" size={20} color='#f4967e'/>
            </TouchableOpacity>
          );
        }
      };
      return (
        <View style={styles.todoContainer}>
          <Text style={styles.todoItem}>{this.props.text}</Text>
          <View style={styles.removeTodo}>{renderDeleteButton()}</View>
        </View>
      );
    }
}
const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Dimensions.get('window').height*.02,
    borderBottomWidth: 2,
    borderColor: '#ACB8BF'
  },
  todoItem: {
    width: Dimensions.get('window').width*.85
  }
});

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    connectionId: state.auth.connectionId
  };
};

export default connect(mapStateToProps)(TodoItem);
