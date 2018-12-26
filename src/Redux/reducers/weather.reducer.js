import {GET_CURRENT_WEATHER, GET_WEATHER_HISTORY, GET_WEATHER_FORECAST} from "../constants";

const initialState = {
  currentWeather: {},
  weatherForecast: [],
  weatherHistory: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload
      };
    case GET_WEATHER_FORECAST:
      return {
        ...state,
        weatherForecast: action.payload,
      };
    case GET_WEATHER_HISTORY:
      return {
        ...state,
        weatherHistory: action.payload
      };
    default:
      return state;
  }
}