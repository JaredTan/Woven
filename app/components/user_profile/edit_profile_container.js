import { connect } from 'react-redux';
import { requestPair, requestConnection } from '../../actions';
import EditProfile from './edit_profile';

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: (firstName, lastName, bio) => dispatch(updateUser(firstName, lastName, bio))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
