import {TOGGLE_MODAL} from "../constants";

const initialState = {
  addNote: false,
  notes: false,
  cities: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    default: return state;
  }
}