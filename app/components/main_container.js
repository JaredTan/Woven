import { connect } from 'react-redux';
import {unauthUser, requestPair, fetchPlant} from '../actions';
import Main from './main';
import MainNavigator from './main_navigator';


const mapStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.auth.user_id,
    connectionId: state.auth.connectionId
  };
};

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser),
  requestPair: (userId) => dispatch(requestPair(userId)),
  fetchPlant: (connectionId) => dispatch(fetchPlant(connectionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
