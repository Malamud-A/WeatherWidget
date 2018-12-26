import { combineReducers } from 'redux';
import cities from './cities.reducer'
import calendar from './calendar.reducer'
import modals from './modals.reducer'
import weather from './weather.reducer'

export default combineReducers({
  cities,
  calendar,
  modals,
  weather,
});