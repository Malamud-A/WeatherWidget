import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCities, setInitialCity, setCity } from "../Redux/actions/cities.actions";
import { toggleModal } from "../Redux/actions/modals.actions";
import { getCurrentWeather, getWeatherHistory, getWeatherForecast } from "../Redux/actions/weather.actions";
import WeatherPane from '../Components/WeatherPane/Index'

const mapStateToProps = ({ calendar, cities, modals, weather }) => ({
  currentDay: calendar.day,
  cities: cities.cities,
  currentCity: cities.selectedCity,
  citiesModalIsVisible: modals.cities,
  currentWeather: weather.currentWeather,
  weatherForecast: weather.weatherForecast,
  weatherHistory: weather.weatherHistory,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCities,
  setInitialCity,
  setCity,
  toggleModal,
  getCurrentWeather,
  getWeatherHistory,
  getWeatherForecast,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPane);