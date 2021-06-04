import React from 'react'
import { TiWeatherCloudy } from 'react-icons/ti'
import '../Stylesheets/Sidebar.css'

export default function Sidebar() {
    return (
        <div className="sidebar">
          <h1><TiWeatherCloudy /> Väder</h1>
        </div>
    )
}
