import axios from "axios";
import { useEffect, useState } from "react";

interface ContentProps {
  results: Array<any>;
  search: string;
}

const api_key = import.meta.env.VITE_SOME_KEY;
// muuttujassa api_key on nyt käynnistyksessä annettu API-avaimen arvo

export const Content: React.FC<ContentProps> = ({ results, search }) => {
  const [countries, setCountries] = useState<Array<any>>([]);

  const [showCountry, setShowCountry] = useState<any>();

  useEffect(() => {
    searchMatches();
    setShowCountry(undefined);
  }, [results]);

  const showOneCountry = (country: any) => {
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
        <img src={country.flags.png} />
      </div>
    );
  };

  const searchMatches = () => {
    const matchingCountries = results.filter((a) => {
      return a.name.common.toLowerCase().includes(search.toLowerCase());
    });
    setCountries(matchingCountries);
    console.log(countries);
  };

  const fetchIcon = async (country: any) => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat={${country.lat}}&lon={${country.lon}}&appid={${api_key}}`
    );
    console.log(result);
  };

  if (countries.length > 10) {
    return <p>Too many Matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return showOneCountry(countries[0]);
  } else if (countries.length < 10 && countries.length !== 1) {
    return (
      <>
        <ul>
          {countries.map((a) => {
            return (
              <li>
                {a.name.common}
                <button onClick={() => setShowCountry(a)}>Show</button>
              </li>
            );
          })}
        </ul>
        {showCountry ? showOneCountry(showCountry) : <div />}
        {showCountry ? fetchIcon(showCountry) : <div />}
      </>
    );
  } else {
    return <p>No results</p>;
  }
};
