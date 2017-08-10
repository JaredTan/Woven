import { connect } from 'react-redux';
import {} from '../actions';
import UserProfile from './user_profile';

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.auth.user_id
  }
}

const mapDispatchToProps = dispatch => ({
  unauthUser: () => dispatch(unauthUser)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
