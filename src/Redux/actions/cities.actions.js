import * as constants from '../constants';
import api from '../../Config/api';
import { getWeatherForecast, getCurrentWeather } from './weather.actions';

export const getCities = () => async (dispatch) => {
  try {
    const res = await api.getCities();
    dispatch({
      type: constants.GET_CITIES,
      payload: res.data,
    })
  } catch (e) {
    console.error(e)
  }
};

export const setInitialCity = (latlng) => (dispatch) => {
  const city = JSON.parse(localStorage.getItem('city'));
  if (city) {
    dispatch({
      type: constants.SET_INITIAL_CITY,
      payload: city,
    });
    dispatch(getWeatherForecast(city.latlng));
    dispatch(getCurrentWeather(city.latlng))
  } else {
    dispatch({
      type: constants.SET_INITIAL_CITY,
      payload: {
        name: "Ukraine",
        capital: "Kiev",
        latlng,
      }
    });
    dispatch(getWeatherForecast(latlng));
    dispatch(getCurrentWeather(latlng))

  }
};

export const setCity = city => (dispatch) => {
  localStorage.setItem('city', JSON.stringify(city));

  dispatch({
    type: constants.SET_CITY,
    payload: city
  })
};