import React, {PureComponent} from 'react';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modals/ModalWrapper';
import Cities from '../Modals/CitiesModal';

class WeatherPane extends PureComponent {

  componentDidMount() {
    this.props.getCities();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position => {
            const {coords} = position;
            this.props.setInitialCity([coords.latitude, coords.longitude]);
          })
      );
    } else alert("Please switch your browser to chrome")
  }

  componentDidUpdate() {
    const {currentDay} = this.props;
    if (this.props.currentCity.latlng &&
        this.props.weatherHistory.date !== moment(currentDay).format("YYYY-MM-DD")
        && moment(currentDay).diff(moment(), 'days') < 0) {
      this.props.getWeatherHistory(this.props.currentCity.latlng, currentDay);
    }
  }


  handleModalToggle = (e) => {
    if (typeof(e) === 'object' && 'currentTarget' in e) {
      this.props.toggleModal(e.currentTarget.dataset.modal);
    } else {
      this.props.toggleModal(e);
    }
  };

  handleCityChange = (city) => {
    const { currentDay } = this.props;
    this.props.setCity(city);
    this.handleModalToggle('cities');
    this.props.getCurrentWeather(city.latlng);
    this.props.getWeatherForecast(city.latlng);
    if (moment(currentDay).diff(moment(), 'days') < 0) this.props.getWeatherHistory(city.latlng, currentDay)
  };

  render() {

    const {currentDay, currentWeather, weatherForecast, weatherHistory} = this.props;
    const todayIsSelected = moment(currentDay).diff(moment(), 'days') === 0;
    const weatherDay =  (() => {
      const currentDayMomentToToday = moment(currentDay).diff(moment(), 'days');
      const formattedCurrentDay = moment(currentDay).format("YYYY-MM-DD");
      if (currentDayMomentToToday === 0) return currentWeather;
      if (currentDayMomentToToday < 0) return weatherHistory.day;
      if (currentDayMomentToToday > 0 && weatherForecast.length) return weatherForecast.find(el => el.date === formattedCurrentDay).day;
    })();

    return (
        <div className="weather-pane">
          <div className="weather-pane__head">
            <h2 className="weather-pane__week-day">{moment(this.props.currentDay).format("dddd")}</h2>
            <p className="weather-pane__date">{moment(this.props.currentDay).format("MMMM DD, YYYY")}</p>
          </div>
          <div className="weather-pane__footer">

            {!!weatherDay && weatherDay.condition && (
                <div className="weather-pane__forecast">
                  <img className="weather-pane__condition-img" src={weatherDay.condition.icon} alt=""/>
                  <p className="weather-pane__temp">{parseInt(todayIsSelected ? weatherDay.temp_c : weatherDay.avgtemp_c)}<span>c</span></p>
                  <p className="weather-pane__condition-text">{weatherDay.condition.text}</p>
                </div>
            )}
            <button onClick={this.handleModalToggle} data-modal="cities" className="weather-pane__current-city-btn">
              <FontAwesomeIcon icon={faMapMarkerAlt}/>
              {`${this.props.currentCity.capital}, ${this.props.currentCity.name}`}
            </button>
          </div>
          {this.props.citiesModalIsVisible &&
          <Modal
              className="cities-modal"
              toggleModal={() => this.handleModalToggle('cities')}
              Modal={Cities}
              caption="Select a city to get weather"
              cities={this.props.cities}
              currentCity={this.props.currentCity.capital}
              onSubmit={this.handleCityChange}
          />
          }
        </div>
    );
  }
}

export default WeatherPane;