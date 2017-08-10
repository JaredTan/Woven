import { connect } from 'react-redux';
import {unauthUser, getTodos, deleteTodo, setTodos} from '../actions';
import Main from './main';

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.auth.user_id
  }
}

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
