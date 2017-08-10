import { connect } from 'react-redux';
import { requestPair } from '../../actions';
import UserProfile from './profile';

const mapStateToProps = (state, ownProps) => {
  console.log(state,'state!!!');
  return {
    currentUserId: state.auth.user_id,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),
  requestPair: (userId) => dispatch(requestPair)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
