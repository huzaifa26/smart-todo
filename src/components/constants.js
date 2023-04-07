import React from "react";

export const PRIMARY="#0E123F";
export const SECONDARY="#AF91E9";
export const API_URL="http://127.0.0.1:8000/";
export const DialogContext = React.createContext();

export const indoorActivities = {
  read:'',
  reading:'',
  study:'',
  studying:'',
  meet:'',
  meeting:'',
  cook:'',
  cooking:'',
  breakfast:'',
  lunch:'',
  dinner:'',
  gym:'',
  exercise:'',
  game:''
};

export const outdoorActivities = {
  ride:'',
  walk:'',
  walking:'',
  walking:'',
  jog:'',
  joging:'',
  run:'',
  running:'',
  football:'',
  sport:'',
};

//http://www.accuweather.com/images/weathericons/3.svg

export const weatherData=[
    {
      "DateTime": "2023-04-07T09:00:00-03:00",
      "EpochDateTime": 1680868800,
      "WeatherIcon": 3,
      "IconPhrase": "Partly sunny",
      "HasPrecipitation": false,
      "IsDaylight": true,
      "Temperature": {
        "Value": 38,
        "Unit": "F",
        "UnitType": 18
      },
      "PrecipitationProbability": 15,
      "MobileLink": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=9&lang=en-us",
      "Link": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=9&lang=en-us"
    },
    {
      "DateTime": "2023-04-07T10:00:00-03:00",
      "EpochDateTime": 1680872400,
      "WeatherIcon": 2,
      "IconPhrase": "Mostly sunny",
      "HasPrecipitation": false,
      "IsDaylight": true,
      "Temperature": {
        "Value": 41,
        "Unit": "F",
        "UnitType": 18
      },
      "PrecipitationProbability": 10,
      "MobileLink": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=10&lang=en-us",
      "Link": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=10&lang=en-us"
    },
    {
      "DateTime": "2023-04-07T11:00:00-03:00",
      "EpochDateTime": 1680876000,
      "WeatherIcon": 2,
      "IconPhrase": "Mostly sunny",
      "HasPrecipitation": false,
      "IsDaylight": true,
      "Temperature": {
        "Value": 44,
        "Unit": "F",
        "UnitType": 18
      },
      "PrecipitationProbability": 0,
      "MobileLink": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=11&lang=en-us",
      "Link": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=11&lang=en-us"
    },
    {
      "DateTime": "2023-04-07T12:00:00-03:00",
      "EpochDateTime": 1680879600,
      "WeatherIcon": 1,
      "IconPhrase": "Sunny",
      "HasPrecipitation": false,
      "IsDaylight": true,
      "Temperature": {
        "Value": 48,
        "Unit": "F",
        "UnitType": 18
      },
      "PrecipitationProbability": 0,
      "MobileLink": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=12&lang=en-us",
      "Link": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=12&lang=en-us"
    },
    {
      "DateTime": "2023-04-07T13:00:00-03:00",
      "EpochDateTime": 1680883200,
      "WeatherIcon": 2,
      "IconPhrase": "Mostly sunny",
      "HasPrecipitation": false,
      "IsDaylight": true,
      "Temperature": {
        "Value": 51,
        "Unit": "F",
        "UnitType": 18
      },
      "PrecipitationProbability": 0,
      "MobileLink": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=13&lang=en-us",
      "Link": "http://www.accuweather.com/en/ca/ohio/b2g/hourly-weather-forecast/3388995?day=1&hbhhour=13&lang=en-us"
    },
]