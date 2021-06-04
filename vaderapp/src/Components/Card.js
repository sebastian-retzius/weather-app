import React from 'react'
import '../Stylesheets/Card.css'
import { useWeatherData } from '../Contexts/WeatherDataContext'


export default function Card(props) {
    const { currentLocation, currentWeatherData } = useWeatherData()

    const getTime = () => {
        const currentDate = currentWeatherData ? new Date(currentWeatherData.time) : null
        currentDate.setTime(currentDate.getTime() + new Date().getTimezoneOffset() * 60 * 1000)
        return currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const getWeatherType = () => {
        if (currentWeatherData.weatherType === 1 )
            return 'Soligt!'
        else if (currentWeatherData.weatherType === 2 )
            return 'Pyttelite moln'
        else if (currentWeatherData.weatherType > 2 && currentWeatherData.weatherType <= 6)
            return 'Molnigt :('
        else if (currentWeatherData.weatherType === 7)
            return 'Dimma :O'
        else if ((currentWeatherData.weatherType > 7 && currentWeatherData.weatherType <= 10) || (currentWeatherData.weatherType > 17 && currentWeatherData.weatherType <= 20))
            return 'Regn :('
        else if (currentWeatherData.weatherType === 11 || currentWeatherData.weatherType === 21)
            return 'Åska :O'
        else if ((currentWeatherData.weatherType > 11 && currentWeatherData.weatherType <= 14) || (currentWeatherData.weatherType > 21 && currentWeatherData.weatherType <= 24))
            return 'Snöblandat regn :('
        else if ((currentWeatherData.weatherType > 14 && currentWeatherData.weatherType <= 17) || (currentWeatherData.weatherType > 24 && currentWeatherData.weatherType <= 27))
            return 'Snö, burr'
    }

    return (currentWeatherData ?
        <div className='card'>
            <div className='header'>
                <h1>{currentLocation}</h1>
                <p>{getTime()}</p>
            </div>
            <div className='currentInfo'>
                <h1>{currentWeatherData.temp} &#8451;</h1>
                <p>{getWeatherType()}</p>
            </div>
        </div>

        :

        <div className='card'>
            <p>Search for a location</p>
        </div>

    )
}
