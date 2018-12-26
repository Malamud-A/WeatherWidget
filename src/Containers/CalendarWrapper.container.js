import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getInitialDay, setDay, addNote, getNotes, deleteNote } from "../Redux/actions/calendar.actions";
import { toggleModal } from "../Redux/actions/modals.actions";
import { getWeatherHistory } from "../Redux/actions/weather.actions";
import CalendarWrapper from '../Components/CalendarWrapper/Index';

const mapStateToProps = ({calendar, modals}) => ({
  currentDay: calendar.day,
  notes: calendar.notes,
  notesModalIsVisible: modals.notes,
  addNoteModalIsVisible: modals.addNote,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInitialDay,
  setDay,
  toggleModal,
  addNote,
  getNotes,
  deleteNote,
  getWeatherHistory,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapper);