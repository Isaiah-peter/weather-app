import React, {useEffect, useState} from 'react'
const api = {
  key: '29fb02b6264b85068edf3eed60205d66',
  base:'http://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (event) => {
    if(event.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      })
    }
  }

  const dateBuilder = (d)=>{
    const months = ['January', 'February', 'Match', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']
    const days = [,'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    
    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={typeof weather.main != 'undefined' ? ((weather.main.temp) > 16 ? 'App': 'App winter'):'App'}>
     <main>
       <div className="search-box">
         <input
           type="text"
           className='search-bar'
           placeholder="Search..."
           onChange= {e => setQuery(e.target.value)}
           value={query}
           onKeyDown={search}
          />
       </div>
       {typeof weather.main != 'undefined'?(
      <div>
       <div className='location-box'>
         <div className="location">{weather.name} {weather.sys.country}</div>
         <div className="date">{dateBuilder(new Date())}</div>
         <div className="weather-box">
           <div className="temp">{ Math.floor(weather.main.temp)}°C</div>
           <div className="weather">{weather.weather[0].main}</div>
         </div>
        </div>  
       </div>
   ) : ('')}
     </main>
    </div>
  );
}

export default App;
