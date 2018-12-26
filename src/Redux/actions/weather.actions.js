import { GET_CURRENT_WEATHER, GET_WEATHER_FORECAST, GET_WEATHER_HISTORY } from "../constants";
import api from '../../Config/api'

export const getCurrentWeather = latlng => async (dispatch) => {
  try {
    const res = await api.getCurrentWeather(latlng);
    dispatch({
      type: GET_CURRENT_WEATHER,
      payload: res.data.current,
    })
  } catch (e) {
    console.error(e);
  }
};

export const getWeatherHistory = (latlng, dateString) => async (dispatch) => {
  try {
    const res = await api.getWeatherHistory(latlng, dateString);
    dispatch({
      type: GET_WEATHER_HISTORY,
      payload: res.data.forecast.forecastday[0],
    })
  } catch (e) {
    console.error(e)
  }
};

export const getWeatherForecast = latlng => async (dispatch) => {
  try {
    const res = await api.getWeatherForecast(latlng);
    dispatch({
      type: GET_WEATHER_FORECAST,
      payload: res.data.forecast.forecastday,
    })
  } catch (e) {
    console.error(e)
  }
};
