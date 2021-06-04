import React from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import {useWeatherData} from '../Contexts/WeatherDataContext'
import '../Stylesheets/SearchInput.css'

export default function SearchInput(props) {
    
    const { search, setSearchLocation, searchLocation } = useWeatherData()

    const onType = (event) => {
        event.preventDefault()
        setSearchLocation(event.target.value)
      }
    

    return (
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
    )
}
