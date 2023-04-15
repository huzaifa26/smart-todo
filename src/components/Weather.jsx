import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';
import { API_URL, weatherData } from './constants';
import { formatWeatherDate, formatWeatherTime } from './Utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

const OpenWeatherHourly = () => {
  const queryClient=useQueryClient()
  const [hourlyData, setHourlyData] = useState([]);
  const [cords, setCords] = useState(null);
  const [location, setLocation] = useState("");
  const [locationMessage, setLocationMessage] = useState(false);
  const locationRef=useRef(null);

  function reverseGeocodingWithGoogle(latitude, longitude) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAyo7SHKsH86GdRBd8QuEJV_1vAROC6sAo`)
      .then(res => res.json())
      .then(response => {
        let s = response.plus_code.compound_code.split(" ")
        s = s.slice(1, s.length)
        s = s.join(" ")
        console.log(s);
        locationRef.current=s
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
      reverseGeocodingWithGoogle(latitude, longitude);
      setLocationMessage(false)
    }
    function error() {
      console.log("Unable to retrieve your location");
      setLocationMessage(true);
      setLoading(false);
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  useEffect(() => {
    geoFindMe();
  }, [])

  const checkTime = (time) => {
    const givenTime = new Date(time);
    const currentTime = new Date();
    const difference = currentTime - givenTime;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    console.log(minutes);
    if (minutes > 5) {
      return true
    } else if (minutes < 5) {
      return false
    }
  }

  function getTodayByDayName(dayName, hour) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const todayWeekday = today.getDay();
    const targetWeekday = weekdays.indexOf(dayName);
    const daysUntilTargetDay = (targetWeekday - todayWeekday + 7) % 7;
    let targetDate = new Date(today.getTime() + daysUntilTargetDay * 24 * 60 * 60 * 1000);
    targetDate.setHours(hour);
    targetDate = targetDate.toString();
    return targetDate;
  }

  const weatherQuery=useQuery(['weather'],fetchData)

  async function fetchData () {
    if(locationRef.current === null) return [];
    let prevTime = localStorage.getItem("prevTime");
    prevTime = JSON.parse(prevTime)
    const condition = checkTime(prevTime);
    if (condition || localStorage.getItem("prevTime") === null) {
      let loc = locationRef.current;
      loc = loc.replace(",", "");
      loc = loc.replace(" ", "+")
      const weatherResponse = await fetch(API_URL + "tasks/weather/" + loc);
      const weatherRes = await weatherResponse.json();
      for (let i=0;i<weatherRes.weather.length;i++){
        let d=weatherRes.weather[i].datetime.split(" ")
        let h=d[1].split(":")[0]
        weatherRes.weather[i]['actualTime']=getTodayByDayName(d[0],h)
      }
      localStorage.setItem("weather", JSON.stringify(weatherRes.weather));
      localStorage.setItem("prevTime", JSON.stringify(new Date()));
      setHourlyData(weatherRes.weather);
      // queryClient.setQueryData(['weather'],weatherRes.weather);
      return weatherRes.weather
    } else {
      let w = localStorage.getItem("weather");
      w = JSON.parse(w);
      setHourlyData(w);
      // queryClient.setQueryData(['weather'],w);
      return w
    }
  };

  useEffect(() => {
    // weatherQuery.refetch();
    queryClient.invalidateQueries(['weather']);
  }, [location,locationRef.current]);

  console.log(weatherQuery.data);

  return (
    <div className='m-2 mx-2 relative h-full'>
      {weatherQuery.isLoading === true ? <img className='w-[50px] m-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' src="/Loading.svg" /> :
        <>
          <h2 className='text-[18] font-bold text-left'>{!locationMessage ? `Hourly Weather Forecast for ${location}` : "Please allow to access location for weather."}</h2>
          <ul className='flex gap-3 mt-6'>
            {weatherQuery?.data?.map((weather, index) => {
              let d = weather.datetime.split(" ")
              console.log(weather)
              return (
                <div key={weather.datetime} className='flex flex-col'>
                  <li className='bg-[rgba(0,0,0,0.05)] rounded-xl flex flex-col items-center min-w-[100px] h-[150px] justify-center' key={index}>
                    <p className='font-[500] text-16px'>{`${weather.temp}°${weather.unit} / ${weather.precip_prob}%`}</p>
                    <img className='max-w-[50px]' src={weather.icon} alt={"Weather Icon"} />
                    <p className='font-[700] text-18px mt-[10px]'>{`${d[0].slice(0, 3)}`}</p>
                    <p className='font-[700] text-18px mt-[10px]'>{`${d[1]}`}</p>
                    {/* <p className='text-[12px] font-[500]'>{timeFormat}</p> */}
                    {/* <p className='font-[400] text-[14px] mt-[5px] text-center'>{`${formatWeatherDate(weather.DateTime)}`}</p> */}
                  </li>
                </div>
              )
            })}
          </ul>
        </>
      }
    </div>
  );
};

export default OpenWeatherHourly;
