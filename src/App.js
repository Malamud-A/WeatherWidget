import React, {Component} from 'react';

import CalendarWrapper from './Containers/CalendarWrapper.container'
import WeatherPane from './Containers/WeatherPane.container'

class App extends Component {

  render() {
    return (
        <div className="App">
          <div className="inner-wrapper">
            <WeatherPane/>
            <CalendarWrapper/>
          </div>
        </div>
    );
  }
}

export default App;
