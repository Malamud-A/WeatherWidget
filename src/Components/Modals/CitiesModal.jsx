import React, {Component} from 'react';

class CitiesModal extends Component {

  state = {
    city: ''
  };

  componentDidMount() {
    this.setState({
        city: this.props.cities.find(e => e.capital === this.props.currentCity),
    })
  }

  handleSelectChange = (e) => {
    this.setState({
      city: this.props.cities.find(city => city.capital === e.target.value),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.city)
  };


  render() {
    return (
        <form>
          <select onChange={this.handleSelectChange} value={this.state.city.capital}>
            {this.props.cities.map((city, index) => (
                <option key={`city-${index}`} value={city.capital}>
                  {city.capital}
                </option>
            ))}
          </select>
          <button onClick={this.handleSubmit} type="submit">Get Weather</button>
        </form>
    );
  }
}

export default CitiesModal;