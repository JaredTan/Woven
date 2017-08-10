import { connect } from 'react-redux';
import { requestSingleUser } from '../../actions';
import UserProfile from './profile';

const mapStateToProps = (state, ownProps) => {
  console.log(state,'state');
  return {
    currentUserId: state.auth.user_id,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),
  requestSingleUser: (userId) => dispatch(requestSingleUser)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
