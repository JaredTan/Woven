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
  TextInput,
  FlatList
} from 'react-native';
import Dimensions from 'Dimensions';

import {getTodos, createTodo} from '../../actions';
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

  componentDidMount() {
    this.props.dispatch(getTodos(this.props.connectionId));
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
      return (
        <FlatList
          data={this.props.todos}
          renderItem={({item}) => (
          <TodoItem key={item._id} text={item.text} checked={item.checked} id={item._id}/>
        )}/>
      );
    };
    let renderScrollViewOrLoading = () => {
      if (this.state.loading) {
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.input}>
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
              placeholder="New To-Do"
              style={styles.input}/>
            <TouchableOpacity onPress={this.addNewTodo} style={styles.plus}>
              <Icon name="plus" size={30} color="#0c9258"/>
            </TouchableOpacity>
          </View>
        );
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>
            Shared To-Dos
          </Text>
        </View>

        <View>
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
    fontSize: 24,
    alignSelf: 'center'
  },
  topBar: {
    position: 'absolute',
    zIndex: 1,
    height: Dimensions.get('window').height*.1,
    left: 0,
    top: 0,
    width: '100%',
    backgroundColor: '#2ecc71'
  },
  todoContainer: {
    top: Dimensions.get('window').height*.14,
    height: Dimensions.get('window').height*.7,
  },
  todos: {
    height: Dimensions.get('window').height*.9,
  },
  newTodoBar: {
    alignSelf: 'center',
    top: Dimensions.get('window').height*.12,
    width: Dimensions.get('window').width*.85,
    paddingTop: Dimensions.get('window').height*.005,
    paddingBottom: Dimensions.get('window').height*.005,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2ecc71'
  },
  inputContainer: {
    paddingLeft: Dimensions.get('window').width*.03,
    paddingRight: Dimensions.get('window').width*.01,
    flexDirection: 'row'
  },
  plus: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  input: {
    flex: 9,
    fontSize: 18
  }
});

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    connectionId: state.auth.connectionId
  };
};


export default connect(mapStateToProps)(TodoList);
