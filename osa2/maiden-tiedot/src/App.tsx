import { useState } from "react";
import { SearchBar } from "./Components/SearchBar";
import axios from "axios";
import { Content } from "./Components/Content";


function App() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<any>();
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const submit = async (event: any) => {
    event.preventDefault();
    const request: Array<any> = await axios
      .get(`${baseUrl}`)
      .then((response) => response.data);
    setResults(request);
  };

  return (
    <>
      <SearchBar setSearch={setSearch} fetch={(event) => submit(event)} />
      {results !== undefined ? (
        <Content results={results} search={search} />
      ) : (
        <div />
      )}
    </>
  );
}

export default App;
