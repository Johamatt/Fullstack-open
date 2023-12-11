import axios from "axios";
import { useEffect, useState } from "react";

interface ContentProps {
  results: Array<any>;
  search: string;
}
const api_key = import.meta.env.VITE_SOME_KEY;

console.log(api_key);
// ($env:VITE_SOME_KEY="") -and (npm run dev) // Windows PowerShell

export const Content: React.FC<ContentProps> = ({ results, search }) => {
  const [countries, setCountries] = useState<Array<any>>([]);

  const [showCountry, setShowCountry] = useState<any>();
  const [showCountryWeather, setShowCountryWeather] = useState<any>();

  const [a, seta] = useState<any>();

  useEffect(() => {
    searchMatches();
    setShowCountry(undefined);
  }, [results]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const result = await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${showCountry.capitalInfo.latlng[0]}&lon=${showCountry.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`
          )
          .then((result) => result.data);

        console.log(result);
        setShowCountryWeather(result);
      } catch (e) {
        console.error("Error fetching weather:", e);
      }
    };

    fetchWeather(); // Call the function immediately
  }, [showCountry]);

  console.log(a);

  console.log(showCountryWeather);
  console.log(showCountry);

  const showOneCountry = (country: any) => {
    console.log(showCountryWeather);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((name: any, i) => {
            return <li key={i}>{name}</li>;
          })}
        </ul>
        <img src={country.flags.png} alt="Country Flag" />

        <div>
          <h2>Weather in Helsinki</h2>
          <h3>Temperature {showCountryWeather?.main.temp} Celcius</h3>
          <img
            src={`https://openweathermap.org/img/wn/${showCountryWeather?.weather[0].icon}@2x.png`}
          />
          <p>Wind: {showCountryWeather?.wind.speed}</p>
        </div>
      </div>
    );
  };

  const searchMatches = () => {
    const matchingCountries = results.filter((a) => {
      return a.name.common.toLowerCase().includes(search.toLowerCase());
    });
    setCountries(matchingCountries);
  };

  if (countries.length > 10) {
    return <p>Too many Matches, specify another filter</p>;
  } else if (countries.length === 1) {
    setShowCountry(countries[0]);
    return showOneCountry(countries[0]);
  } else if (countries.length < 10 && countries.length !== 1) {
    return (
      <>
        <ul>
          {countries.map((a, i) => {
            return (
              <li key={i}>
                {a.name.common}
                <button onClick={() => setShowCountry(a)}>Show</button>
              </li>
            );
          })}
        </ul>
        {showCountry ? showOneCountry(showCountry) : <div />}
      </>
    );
  } else {
    return <p>No results</p>;
  }
};
