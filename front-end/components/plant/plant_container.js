import {connect} from 'react-redux';

import Plant from './plant';
import {unauthUser, fetchPlant, updatePlant} from '../../actions';

const mapStateToProps = (state) => {
  const { currentUser, partner } = state.users;
  return {
    connectionId: state.auth.connectionId,
    plant: Object.assign({}, state.plant),
    currentUser,
    partner
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPlant: (connectionId) => dispatch(fetchPlant(connectionId)),
  updatePlant: (connectionId, plant) => dispatch(updatePlant(connectionId, plant))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plant);
