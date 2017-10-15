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
import {ListItem, CheckBox} from 'native-base';
import {updateTodo, getTodos, deleteTodo, setTodos} from '../../actions';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false
    };

    this.onDelete = this.onDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.props.dispatch(updateTodo(this.props.connectionId, this.props.id));
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
            <Icon name="close" size={28} color='#f4967e'/>
          </TouchableOpacity>
        );
      }
    };
    return (
      <ListItem style={styles.todoContainer}>
        <View style={styles.checkbox}>
          <CheckBox checked={this.props.checked} onPress={this.handleUpdate} color='#12512d'/>
        </View>
        <Text style={styles.todoItem}>{this.props.text}</Text>
        <View style={styles.removeTodo}>{renderDeleteButton()}</View>
      </ListItem>
    );
  }
}
const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width*.92,
    padding: Dimensions.get('window').height*.02,
    borderBottomWidth: 2,
    borderColor: 'lightgrey'
  },
  checkbox: {
    flex: 1,
  },
  todoItem: {
    flex: 8,
    fontSize: 18,
  },
  removeTodo: {
    flex: 1
  }
});

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    connectionId: state.auth.connectionId
  };
};

export default connect(mapStateToProps, null)(TodoItem);
