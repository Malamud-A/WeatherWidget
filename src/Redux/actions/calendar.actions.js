import * as constants from '../constants';
import moment from 'moment';

export const getInitialDay = () => (dispatch) => {
  const day = localStorage.getItem('day');
  if (day) {
    dispatch({
      type: constants.GET_INITIAL_DAY,
      payload: new Date(day),
    })
  } else {
    dispatch({
      type: constants.GET_INITIAL_DAY,
      payload: new Date(),
    })
  }
};

export const setDay = (dateString) => (dispatch) => {
  localStorage.setItem('day', dateString.toString());
  dispatch({
    type: constants.SET_DAY,
    payload: new Date(dateString),
  })
};

export const getNotes = (dateString) => (dispatch) => {
  const notes = JSON.parse(localStorage.getItem('notes'));
  const formattedDate = moment(dateString).format('DD/MM/YY');
  if (notes)
  dispatch({
    type: constants.GET_NOTES,
    payload: notes[formattedDate] ? notes[formattedDate] : [],
  });
  else dispatch({
    type: constants.GET_NOTES,
    payload: [],
  })
};


export const addNote = (note, dateString) => (dispatch) => {
  let notes = JSON.parse(localStorage.getItem('notes'));
  let id;
  const formattedDate = moment(dateString).format('DD/MM/YY');

  if (notes){
    if(notes[formattedDate]){
      id = notes[formattedDate][notes[formattedDate].length - 1].id + 1;
      notes[formattedDate].push({
        note,
        id
      })
    } else {
      id = 1;
      notes[formattedDate] = [{
        note,
        id
      }]
    }
  } else {
    id = 1;
    notes = {
      [formattedDate]: [{
        note,
        id,
      }]
    }
  }
  localStorage.setItem('notes', JSON.stringify(notes));

  dispatch({
    type: constants.ADD_NOTE,
    payload: {
      note,
      id,
    },
  })
};

export const deleteNote = id => (dispatch, getState) => {
  const formattedDay = moment(getState().calendar.day).format("DD/MM/YY");
  const notes = JSON.parse(localStorage.getItem('notes'));
  notes[formattedDay] = notes[formattedDay].filter(el => el.id !== parseInt(id));
  if (!notes[formattedDay].length) {
    delete notes[formattedDay];
  }
  localStorage.setItem('notes', JSON.stringify(notes));

  dispatch({
    type: constants.DELETE_NOTE,
    payload: parseInt(id),
  })
}