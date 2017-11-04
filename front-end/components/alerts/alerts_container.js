import {connect} from 'react-redux';
import Alerts from './alerts';

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts
  };
};

export default connect(mapStateToProps, null)(Alerts);
