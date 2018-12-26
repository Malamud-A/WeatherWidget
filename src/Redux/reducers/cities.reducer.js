import * as constants from '../constants';

const initialState = {
  cities: [],
  selectedCity: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_CITIES:
      return {
        ...state,
        cities: action.payload
      };
    case constants.SET_INITIAL_CITY:
      return {
        ...state,
        selectedCity: action.payload,
      };
    case constants.SET_CITY:
      return {
        ...state,
        selectedCity: action.payload
      };
    default:
      return state;
  }
}

