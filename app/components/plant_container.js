import {connect} from 'react-redux';

import Plant from './plant.js';
import {unauthUser, fetchPlant, updatePlant} from '../actions';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    connectionId: state.auth.connectionId,
    plant: state.plant
  };
};

const mapDispatchToProps = dispatch => ({

  fetchPlant: (connectionId) => dispatch(fetchPlant(connectionId)),
  updatePlant: (connectionId, plant) => dispatch(fetchPlant(connectionId, plant))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plant);
