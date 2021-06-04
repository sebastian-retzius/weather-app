import React, { useContext, useState } from 'react'
import axios from 'axios'

const WeatherDataContext = React.createContext()

export function useWeatherData() {
    return useContext(WeatherDataContext)
}

export function WeatherDataProvider({children}) {

    const [currentLocation, setCurrentLocation] = useState('')
    const [searchLocation, setSearchLocation] = useState('')
    const [currentWeatherData, setCurrentWeatherData] = useState(null)

    const search = async (event) => {
        event.preventDefault()
        const coordinates = await getCoordinates()
        const weatherData = await getWeatherData(coordinates)
        setCurrentLocation(searchLocation)
        setSearchLocation('')
        const unformattedWeatherData = weatherData.data.timeSeries[1]
        const formattedWeatherData = {
            time: unformattedWeatherData.validTime,
            temp: unformattedWeatherData.parameters[0].values[0],
            weatherType: unformattedWeatherData.parameters[18].values[0]
        }
        console.log(formattedWeatherData)
        setCurrentWeatherData(formattedWeatherData)
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

    const value = {
        currentLocation,
        searchLocation,
        setCurrentLocation,
        setSearchLocation,
        search,  
        currentWeatherData
    }

    return (
        <WeatherDataContext.Provider value={value}>
            {children}
        </WeatherDataContext.Provider>
    )
}
