import React from 'react'
import '../Stylesheets/App.css'
import { TiWeatherCloudy } from 'react-icons/ti'
import { FaSearchLocation } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useState } from 'react'
import axios from 'axios'




function App() {
  const [searchLocation, setSearchLocation] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')

  const onType = (event) => {
    event.preventDefault()
    setSearchLocation(event.target.value)
  }

  const search = async (event) => {
    event.preventDefault()
    const coordinates = await getCoordinates()
    const weatherData = await getWeatherData(coordinates)
    setCurrentLocation(searchLocation)
    setSearchLocation('')
    console.log(coordinates)
    console.log(weatherData)
  }

  const getCoordinates = async () => {
    const key = process.env.REACT_APP_MAPQUEST_API_KEY
    const result = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${searchLocation}`)
    return result.data.results[0].locations[0].latLng
  }

  const getWeatherData = async (coordinates) => {
    const result = await axios.get(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.lng}/lat/${coordinates.lat}/data.json`)
    return result
  }

  return (
    <IconContext.Provider value={{ size: '1.5em' }}>
      <div className="App">
        <div className="sidebar">
          <h1><TiWeatherCloudy /> Väder</h1>
        </div>
        <div className="content">
          <form className='search-form' onSubmit={search}>
            <i className='icon'><FaSearchLocation /></i>
            <input
              className='search-field'
              type='text'
              placeholder='Sök på en ort...'
              value={searchLocation}
              onChange={onType}>
            </input>
          </form>
          <div className='card'>
            <h1>{currentLocation}</h1>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default App;
