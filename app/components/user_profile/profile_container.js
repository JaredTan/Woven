import { connect } from 'react-redux';
import { requestPair, requestConnection, resetPair } from '../../actions';
import UserProfile from './profile';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.auth.user_id,
    users: state.users,
    connectionId: state.auth.connectionId
  };
};

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),
  requestPair: (userId) => dispatch(requestPair(userId)),
  resetPair: () => dispatch(resetPair())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
