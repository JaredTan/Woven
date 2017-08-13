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
import Dimensions from 'Dimensions';

import {unauthUser, getTodos, deleteTodo, setTodos, createTodo} from '../actions';
import TodoItem from './todo_item';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      newTodoText: undefined,
      loading: false
    };

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
            automaticallyAdjustContentInsets={false}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(newTodoText) => {
                  this.setState({newTodoText});
                }}
                placeholder="New To-Do Text"
                style={styles.input}/>
            </View>
            <TouchableOpacity onPress={this.addNewTodo}>
              <Icon name="plus" size={20} color="black"/>
            </TouchableOpacity>
          </ScrollView>
        );
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>
            To-Do List
          </Text>
        </View>

        <View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}/>
            }
            automaticallyAdjustContentInsets={false}>
            {renderScrollViewOrLoading()}
            {renderTodos()}
          </ScrollView>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    top: Dimensions.get('window').height*.03,
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  topBar: {
    position: 'absolute',
    height: Dimensions.get('window').height*.08,
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: '#2ecc71'
  },
  todoContainer: {
    top: Dimensions.get('window').height*.25,
    height: Dimensions.get('window').height*.5,
  },
  inputContainer: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height*.2,
    zIndex: 10,
    borderWidth: 5,
    borderColor: 'black'
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
