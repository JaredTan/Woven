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
          <View>
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
            </ScrollView>
            <TouchableOpacity onPress={this.addNewTodo} style={styles.plus}>
              <Icon name="plus" size={20} color="black"/>
            </TouchableOpacity>
          </View>
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
            <View style={styles.todoContainer}>
              {renderTodos()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    height: Dimensions.get('window').height*.9,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'blue'
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
    top: Dimensions.get('window').height*.08,
    height: Dimensions.get('window').height*.82,
    borderWidth: 5,
    borderColor: 'red'
  },
  inputContainer: {
    top: Dimensions.get('window').height*.08,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2ecc71"
  },
  plus: {
    left: Dimensions.get('window').width*.9,
    width: 20,
    borderWidth: 1,
    borderColor: 'orange'
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
