import { connect } from 'react-redux';
import {unauthUser, requestSingleUser} from '../actions';
import Main from './main';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.auth.user_id
  }
}

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),
  requestSingleUser: (userId) => dispatch(requestSingleUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
