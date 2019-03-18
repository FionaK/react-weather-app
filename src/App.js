import React, { Component } from 'react';
import Weather from './components/Weather';
import Forms from './components/Forms';
import Title from './components/Title';

import './App.css';

const API_KEY = '81e3024e1cecf90b6765e327d3393e4e';

class App extends React.Component {
  state = {
    temperature:undefined,
    city:undefined,
    country:undefined,
    description: undefined,
    error:undefined
  }
   getWeater = async (e) => {
     e.preventDefault();
     const city = e.target.elements.city.value;
     const country = e.target.elements.country.value;
     const api_call = await fetch(`https://openweathermap.org/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
     const call_data = await api_call.json();

     if (city && country){
       let data = e.target.data;
       this.setState({
         temperature:data.main.temp,
         city:data.name,
         country:data.sys.country,
         description:data.weather[0].description,
         error:"Enter values"
       });
     }
   }
    render() {
    return (
      <div className="App">
          <div className="app-aside">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Title />
                </div>
                <div className="col-xs-7 form-container">
                  <Forms getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                    />
                </div>
              </div>
            </div>
          </div>
    
      </div>
    );
  }
}

export default App;
