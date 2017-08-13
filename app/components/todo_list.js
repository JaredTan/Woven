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

import {unauthUser, getTodos, deleteTodo, setTodos} from '../actions';
import NewTodo from './new_todo';
import TodoItem from './todo_item';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    }

    this.onBack = this.onBack.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

  }

  onBack() {
    this.props.dispatch(setTodos([]));
    this.props.navigator.pop();
  }

  addNewTodo() {
    this.props.navigator.push({
      component: NewTodo,
      title: 'New Todo',
      navigationBarHidden: true
    });
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(getTodos(this.props.connectionId)).then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    let renderTodos = () => {
      return this.props.todos.map((todo) => {
        return (
          <TodoItem key={todo._id} text={todo.text} id={todo._id}/>
        );
      });
    };
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.onBack}>
            <Icon name="chevron-left" size={30} color="white"/>
          </TouchableOpacity>
          <Text style={styles.title}>
            To-Do List
          </Text>
          <TouchableOpacity onPress={this.addNewTodo}>
            <Icon name="plus" size={24} color="white"/>
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}/>
          }
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.scrollViewContainer}>
          {renderTodos()}
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  todoContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    connectionId: state.auth.connectionId
  };
};


export default connect(mapStateToProps)(TodoList);
