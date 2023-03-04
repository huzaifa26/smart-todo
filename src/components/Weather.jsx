import React, { useState, useEffect } from 'react';

const OpenWeatherHourly = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const getLatLang = async () => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${'d6fc68236eb8c13898ca90316afa99cf'}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLat(data[0].lat);
      setLon(data[0].lon);
      return { lat: data[0].lat, lon: data[0].lon }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { lat, lon } = getLatLang();
      // const response = await fetch(`https://pro.openweathermap.org/data/2.5/hourly?lat=${lat}&lon=${lon}&appid=d6fc68236eb8c13898ca90316afa99cf`);
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/hourly?q=${city}&appid=d6fc68236eb8c13898ca90316afa99cf&units=metric`);
      const data = await response.json();
      console.log(data);
      // setHourlyData(data.list.slice(0, 7));
    };
    fetchData();
  }, [city]);

  const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <div className='m-2 mx-6'>
      <h2 className='text-[18] font-bold'>Hourly Weather Forecast for {city}</h2>
      <ul className='flex gap-3 mt-6'>
        {hourlyData.map((hour, index) => {
          const time = new Date(hour.dt_txt).toLocaleTimeString();
          const timeFormat = time.split(" ")[1];
          const hours = time.split(":")[0]
          return (
            <li className='bg-[rgba(0,0,0,0.05)] rounded-xl flex flex-col items-center min-w-[100px] h-[130px] justify-center' key={index}>
              <p className='font-bold text-16px'>{Math.round(hour.main.temp)}°C</p>
              <img src={getIconUrl(hour.weather[0].icon)} alt={hour.weather[0].description} />
              <p className='font-[700] text-18px'>{`${hours}:00`}</p>
              <p className='text-[12px] font-[500]'>{timeFormat}</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default OpenWeatherHourly;