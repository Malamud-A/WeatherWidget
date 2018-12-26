import * as constants from '../constants';

const initialState = {
  day: '',
  notes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_INITIAL_DAY:
      return {
        ...state,
        day: action.payload,
      };
    case constants.SET_DAY:
      return {
        ...state,
        day: action.payload,
      };
    case constants.GET_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case constants.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };
    case constants.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(el => el.id !== action.payload),
      };
    default:
      return state;
  }
}