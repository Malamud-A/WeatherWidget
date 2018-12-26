import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCities } from "../Redux/actions/cities.actions";
import CitiesModal from '../Components/Modals/CitiesModal';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCities
}, dispatch);

export default connect(null, mapDispatchToProps)(CitiesModal);