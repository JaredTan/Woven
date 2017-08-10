import { connect } from 'react-redux';
import { requestPair, requestConnection } from '../../actions';
import UserProfile from './profile';

const mapStateToProps = (state, ownProps) => {
  console.log(state,'state!!!');
  return {
    currentUserId: state.auth.user_id,
    users: state.users,
    connectionId: state.auth.connectionId
  }
}

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),
  requestPair: (userId) => dispatch(requestPair),
  requestConnection: (connection_id) => dispatch(requestConnection(connection_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
