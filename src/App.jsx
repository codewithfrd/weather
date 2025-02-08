import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LiaWindSolid } from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";

const App = () => {
  const [time, setTime] = useState(new Date());
  const [weatherData, setweatherData] = useState(false);
  const inputRef = useRef();

  // fetching wethdar data
  const search = (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`;
    try {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            alert(data.message);
            return;
          }
          return res.json();
        })
        .then((data) => {
          const icon = allIcons[data.weather[0].icon] || <WiHumidity />;
          setweatherData({
            temp: Math.floor(data.main.temp),
            humidity: data.main.humidity,
            wind: data.wind.speed,
            location: data.name,
            icon: icon,
          });
        })
        .catch((error) => {
          alert('city not found');
          console.error(error.message);
          setweatherData(false);
        });
    } catch (error) {}
  };
  useEffect((city) => {
    search("hariyana");
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // allicons
  const allIcons = {
    "01d": "src/assets/images/01d.png",
    "01n": "src/assets/images/01n.png",
    "02d": "src/assets/images/02d.png",
    "02n": "src/assets/images/02n.png",
    "03d": "src/assets/images/03d.png",
    "03n": "src/assets/images/03n.png",
    "04d": "src/assets/images/04d.png",
    "04n": "src/assets/images/04n.png",
    "09d": "src/assets/images/09d.png",
    "09n": "src/assets/images/09n.png",
    "10d": "src/assets/images/10d.png",
    "10n": "src/assets/images/10n.png",
    "11d": "src/assets/images/11d.png",
    "11n": "src/assets/images/11n.png",
    "13d": "src/assets/images/13d.png",
    "13n": "src/assets/images/13n.png",
  };

  // dateTime function
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); // Update time every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [time]);

  return (
    <>
      <div className="px-2">
        <div className="w-80 border border-gray-300 mx-auto mt-20 rounded-2xl pb-2">
          {/* dataTime & input  */}
          <div>
            <p className="mt-3 text-center text-red-500 font-medium text-xl">
              {time.toLocaleDateString()} - {time.toLocaleTimeString()}
            </p>
            <form
              onSubmit={submitHandler}
              action=""
              className="flex gap-3 px-3 pt-2"
            >
              <input
                type="text"
                ref={inputRef}
                className="border w-full rounded-full px-4 py-1 outline-none focus:border-2 focus:border-blue-400 capitalize"
                placeholder="Search"
              />
              <button
                onClick={() => search(inputRef.current.value)}
                className="cursor-pointer text-xl p-2 rounded-full bg-gray-500 text-white"
              >
                <IoSearch />
              </button>
            </form>
          </div>

          {weatherData ? (
            <>
              {/* showing icon - temp - location  */}
              <div>
                <img src={weatherData.icon} className="w-52 mx-auto" />
                <h1 className="text-center font-bold text-gray-400 text-4xl">
                  {weatherData.temp}°C
                </h1>
                <p className="text-center text-2xl text-gray-500 font-medium">
                  {weatherData.location}
                </p>
              </div>

              {/* humidity & windspeed  */}
              <div className="flex justify-around mt-2">
                {/* humidity */}
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    <WiHumidity />
                  </div>
                  <div className="text-sm font-semibold">
                    <p>{weatherData.humidity} %</p>
                    <span>humidity</span>
                  </div>
                </div>
                {/* windspeed  */}
                <div className="flex items-center gap-3">
                  <div className="text-3xl">
                    <LiaWindSolid />
                  </div>
                  <div className="text-sm font-semibold">
                    <p>{weatherData.wind}</p>
                    <span>windspeed</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
