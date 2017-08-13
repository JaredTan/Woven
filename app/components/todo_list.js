import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput
} from 'react-native';

import {unauthUser, getTodos, deleteTodo, setTodos, createTodo} from '../actions';
import TodoItem from './todo_item';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      newTodoText: undefined,
      loading: false
    }

    this.addNewTodo = this.addNewTodo.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

  }


  addNewTodo() {
    let {newTodoText} = this.state;
    let {dispatch} = this.props;
    if (newTodoText && newTodoText != "") {
      this.setState({loading: true});
      dispatch(createTodo(this.props.connectionId, newTodoText)).then(() => {
        this.setState({loading: false});
      });
    }
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
    let renderScrollViewOrLoading = () => {
      if (this.state.loading) {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
              Creating todo...
            </Text>
          </View>
        );
      } else {
        return (
          <ScrollView
            automaticallyAdjustContentInsets={false}
            contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(newTodoText) => {
                  this.setState({newTodoText})
                }}
                placeholder="New To-Do Text"
                style={styles.input}/>
            </View>
          </ScrollView>
        );
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
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
          {renderScrollViewOrLoading()}
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
  },
  inputContainer: {
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2ecc71"
  },
  input: {
    height: 26
  }
});

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    connectionId: state.auth.connectionId
  };
};


export default connect(mapStateToProps)(TodoList);
