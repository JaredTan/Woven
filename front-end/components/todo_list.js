import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Image,
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
          <View>
            <Text>
              Creating todo...
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(newTodoText) => {
                this.setState({newTodoText});
              }}
              placeholder="New To-Do Text"
              style={styles.input}/>
            <TouchableOpacity onPress={this.addNewTodo} style={styles.plus}>
              <Icon name="plus" size={20} color="#0E9B2D"/>
            </TouchableOpacity>
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
        <Image
            source={require('../assets/navbar/navbar.png')}
            style={styles.topBar}>
          <Text style={styles.title}>
            Shared To-Dos
          </Text>
        </Image>

        <View style={{flex: 1}}>
          <ScrollView
            style={styles.todos}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}/>
            }
            automaticallyAdjustContentInsets={false}>
            <View style={styles.newTodoBar}>
              {renderScrollViewOrLoading()}
            </View>
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
    height: Dimensions.get('window').height*.9
  },
  title: {
    top: Dimensions.get('window').height*.04,
    color: 'white',
    fontSize: 19,
    letterSpacing: 2,
    alignSelf: 'center'
  },
  topBar: {
    position: 'absolute',
    zIndex: 1,
    height: Dimensions.get('window').height*.09,
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: 'transparent'
  },

  todoContainer: {
    top: Dimensions.get('window').height*.12,
    height: Dimensions.get('window').height*.7
  },
  todos: {
    height: Dimensions.get('window').height*.9
  },
  newTodoBar: {
    alignSelf: 'center',
    top: Dimensions.get('window').height*.12,
    width: Dimensions.get('window').width*.9,
    paddingTop: Dimensions.get('window').height*.01,
    paddingBottom: Dimensions.get('window').height*.01,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#46D2D6'
  },
  inputContainer: {
    paddingLeft: Dimensions.get('window').width*.03,
    paddingRight: Dimensions.get('window').width*.03,
    flexDirection: 'row'
  },
  plus: {
    width: 20,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  input: {
    flex: 9,
    fontSize: 15
  }
});

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    connectionId: state.auth.connectionId
  };
};


export default connect(mapStateToProps)(TodoList);
