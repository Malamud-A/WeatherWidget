import React, {Component} from 'react';
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modals/ModalWrapper';
import AddNote from '../Modals/AddNoteModal';
import Notes from '../Modals/NotesModal';

import Calendar from 'react-calendar'


class CalendarWrapper extends Component {

  componentDidMount() {
    this.props.getInitialDay();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentDay !== this.props.currentDay) {
      this.props.getNotes(this.props.currentDay)
    }
  }

  handleDayClick = e => {
    this.props.setDay(e);
  };

  handleModalToggle = (e) => {
    if (typeof(e) === 'object' && 'currentTarget' in e){
    this.props.toggleModal(e.currentTarget.dataset.modal);
    } else {
      this.props.toggleModal(e);
    }
  };

  handleNoteAdd = (note) => {
    this.props.addNote(note, this.props.currentDay);
    this.handleModalToggle('addNote');
  };

  handleNoteDelete = (e) => {
    this.props.deleteNote(e.currentTarget.dataset.id);
  };

  render() {

    const {currentDay} = this.props;
    return (
        <div className="calendar">
          <div className="calendar-title">
            <h2 className="calendar-title__current-month">{moment(currentDay).format("MMMM, YYYY")}</h2>
            <button data-modal="notes" onClick={this.handleModalToggle} className="calendar-title__notes-modal-btn">
              <FontAwesomeIcon icon={faBars}/>
              <span className="calendar-title__notes-count">{this.props.notes.length}</span>
            </button>
          </div>
          <Calendar
              onClickDay={this.handleDayClick}
              showNavigation={false}
              value={currentDay}
              tileDisabled={({ activeStartDate, date }) => {
                const currentDayDate = new Date(currentDay);
                return activeStartDate.getMonth() !== date.getMonth() ||
                  Math.abs(moment(date).diff(moment(), 'days')) >= 7 ||
                  currentDayDate.getDate() === date.getDate()}
              }
              tileClassName={({ date }) => {
                const classes = ['react-calendar__day'];
                const currentDayDate = new Date(currentDay);
                if (currentDayDate.getMonth() !== date.getMonth() || Math.abs(moment(date).diff(moment(), 'days')) >= 7) {
                  classes.push('react-calendar__day--disabled');
                }
                if(currentDayDate.getDate() === date.getDate() && currentDayDate.getMonth() === date.getMonth()) {
                  classes.push('react-calendar__day--selected')
                }
                return classes.join(' ');
              }}
          />
          <button onClick={this.handleModalToggle} data-modal="addNote" className="calendar__add-note-button">+ Add Notes</button>
          {this.props.addNoteModalIsVisible &&
            <Modal
              className="add-note-modal"
              Modal={ AddNote }
              caption={`Add note to the ${moment(currentDay).format("DD of MMMM")}`}
              toggleModal={() => this.handleModalToggle('addNote')}
              onSubmit={this.handleNoteAdd}
            />
          }
          {this.props.notesModalIsVisible &&
            <Modal
              className="notes-modal"
              Modal={ Notes }
              caption={`Notes for the ${moment(currentDay).format("DD of MMMM")}`}
              toggleModal={() => this.handleModalToggle('notes')}
              notes={this.props.notes}
              handleDelete={this.handleNoteDelete}
            />
          }
        </div>
    );
  }
}

export default CalendarWrapper;