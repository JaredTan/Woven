import {connect} from 'react-redux';

import InputModal from './input_modal';
import {fetchPlant, updatePlant} from '../../actions';

const mapStateToProps = (state) => {
  const { currentUser, partner } = state.users;
  return {
    connectionId: state.auth.connectionId,
    plant: Object.assign({}, state.plant),
    currentUser,
    partner
  };
};

const mapDispatchToProps = (dispatch) => ({
  updatePlant: (connectionId, plant) => dispatch(updatePlant(connectionId, plant))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputModal);
