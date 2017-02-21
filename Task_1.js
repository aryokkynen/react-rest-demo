import React, { Component } from 'react';
import './App.css';
//Task 1: Use openweather API and make rest call to display weather.
var APIKEY = 'Type your api key here';

class App extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.fetchWeather = this.fetchWeather.bind(this);
        this.state = {
            weather: [],
            city : '',
            temp: 0,
            url: '',
        };
    } 

  handleChange(event) {
    this.setState({
        city: event.target.value
    });
}

fetchWeather() {
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city +'&APPID=' + APIKEY + '&units=metric')
    .then(result => result.json())
    .then(result => this.setState({
            city: '', 
            weather: result.weather[0],
            temp: result.main.temp,
            url : 'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png',
        })
    );

}

 render() {
    return (
            <div>
                City: <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.fetchWeather}>Send</button>
                <p>Temperature: {this.state.temp} Celsius</p>
                <p>Weather:  {this.state.weather.main}</p>
                <img alt="weathericon" src={this.state.url}/>
            </div>
        );
    }
}

export default App;
