import React from 'react'
import '../Stylesheets/App.css'
import { IconContext } from 'react-icons'
import Card from './Card'
import Sidebar from './Sidebar'
import SearchInput from './SearchInput'
import {WeatherDataProvider} from '../Contexts/WeatherDataContext'


function App() {

  return (
    <WeatherDataProvider>
    <IconContext.Provider value={{ size: '1.5em' }}>
      <div className="App">
        <Sidebar/>
        <div className="content">
          <SearchInput />
          <Card />
        </div>
      </div>
    </IconContext.Provider>
    </WeatherDataProvider>  
  );
}

export default App;
