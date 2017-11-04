import {connect} from 'react-redux';
import Successes from './successes';

const mapStateToProps = (state) => {
  return {
    successes: state.successes
  }
};

export default connect(mapStateToProps)(Successes);
