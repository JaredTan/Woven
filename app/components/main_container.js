import { connect } from 'react-redux';
import {unauthUser, requestPair} from '../actions';
import Main from './main';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.auth.user_id
  }
}

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),
  requestPair: (userId) => dispatch(requestPair(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
