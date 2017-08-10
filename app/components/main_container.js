import { connect } from 'react-redux';
import {unauthUser, requestPair, requestConnection} from '../actions';
import Main from './main';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.auth.user_id,
    connectionId: state.auth.connectionId
  }
}

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),
  requestPair: (userId) => dispatch(requestPair(userId)),
  requestConnection: (connection_id) => dispatch(requestConnection(connection_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
