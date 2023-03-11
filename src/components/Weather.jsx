import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';

const OpenWeatherHourly = () => {
  const [hourlyData, setHourlyData] = useState([]);
  const [cords, setCords] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${"d6fc68236eb8c13898ca90316afa99cf"}&units=metric`);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cords?.lat}&lon=${cords?.long}&appid=${""}&units=metric`);
      const data = await response.json();
      setHourlyData(data?.list.slice(0, 5));
      setLoading(false);
    };
    fetchData();
  }, [location]);
  const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}.png`;


  function reverseGeocodingWithGoogle(latitude, longitude) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAyo7SHKsH86GdRBd8QuEJV_1vAROC6sAo`)
      .then(res => res.json())
      .then(response => {
        console.log("User's Location Info: ", response)
        console.log(response.plus_code.compound_code)
        let s = response.plus_code.compound_code.split(" ")
        s = s.slice(1, s.length)
        s = s.join(" ")
        setLocation(s)
      })
      .catch(status => {
        console.log('Request failed.  Returned status of', status)
      })
  }

  function geoFindMe() {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      setCords({ lat: position.coords.latitude, long: position.coords.longitude })
      reverseGeocodingWithGoogle(latitude, longitude)
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  useEffect(() => {
    geoFindMe();
  }, [])

  return (
    <div className='m-2 mx-6 relative h-full'>
      {loading === true ? <img className='w-[50px] m-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' src="/Loading.svg" /> :
        <>
          <h2 className='text-[18] font-bold text-left'>Hourly Weather Forecast for {location}</h2>
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
        </>
      }
    </div>
  );
};

export default OpenWeatherHourly;
