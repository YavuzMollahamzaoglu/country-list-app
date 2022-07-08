import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import CountryDetail from "./Components/CountryDetail";
import PeopleInfo from "./Components/PeopleInfo";
import PersonInfo from "./Components/PersonInfo";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  const [countryName, setCountryName] = useState("");
  const [country, setCountry] = useState();
  const [countryNames, setCountryNames] = useState([]);

  const handleChange = (event) => {
    setCountryName(event.target.value);
  };
  useEffect(() => {
    fetch(`https://restcountries.com/v3/all`)
      .then((response) => {
        return response.json();
      })
      .then((countries) => {
        const result = countries.map((country) => {
          return country.name.common;
        });

        console.log(result);
        setCountryNames(result);
      });
  }, []);

  const people = [
    {
      name: "Onur",
      lastName: "Keniş",
      birth: { date: "15 Şubat", place: "Adana" },
    },
    {
      name: "Yavuz",
      lastName: "Mollahamzaoğlu",
      birth: { date: "18 Haziran", place: "Rize" },
    },
  ];

  const handleCountryNameChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleSearchClick = () => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((response) => {
        return response.json();
      })
      .then((response) => setCountry(response[0]));
  };

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Select Countries"
        variant="standard"
        onChange={handleCountryNameChange}
      />

      <Button variant="contained" onClick={handleSearchClick}>
        Search
      </Button>

      {country && <CountryDetail country={country} />}
      <PeopleInfo people={people} />

      {people.map((val) => {
        return <PersonInfo person={val} />;
      })}

      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="country-select-small">Countries</InputLabel>
        <Select
          labelId="country-select-small"
          id="country-select-small"
          value={countryName}
          label="Coun"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {countryNames.map((countryName) => {
            return <MenuItem value={countryName}>{countryName}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
