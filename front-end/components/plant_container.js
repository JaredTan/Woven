import {connect} from 'react-redux';

import Plant from './plant';
import {unauthUser, fetchPlant, updatePlant} from '../actions';

const mapStateToProps = (state) => {
  console.log(state.plant,'state plant in plant container');
  return {
    connectionId: state.auth.connectionId,
    plant: Object.assign({}, state.plant)
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
