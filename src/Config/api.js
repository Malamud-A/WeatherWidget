import axios from 'axios'
import moment from 'moment'

export default {
  getCities: () => axios.get('https://restcountries.eu/rest/v2/region/europe', {
    params: {
      fields: 'capital;latlng;name'
    }
  }),

  getCurrentWeather: (latlng) => axios.get('http://api.apixu.com/v1/current.json', {
    params: {
      key: '1dc82a4d18514ec386672253182612',
      q: latlng.join(','),
    },
  }),

  getWeatherHistory: (latlng, dateString) => {
    let dt = moment(dateString).format('YYYY-MM-DD');
    return axios.get('http://api.apixu.com/v1/history.json', {
    params: {
      key: '1dc82a4d18514ec386672253182612',
      q: latlng.join(','),
      dt
    }
  })},

  getWeatherForecast: (latlng) => axios.get('http://api.apixu.com/v1/forecast.json', {
    params: {
      key: '1dc82a4d18514ec386672253182612',
      q: latlng.join(','),
      days: 7,
    }
  })
};
