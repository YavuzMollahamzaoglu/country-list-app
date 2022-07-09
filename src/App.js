import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CountryDetail from "./Components/CountryDetail";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [countryName, setCountryName] = useState("");
  const [country, setCountry] = useState();
  const [countryNames, setCountryNames] = useState([]);

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

  const handleChangeCountryName = (event) => {
    setCountryName(event.target.value);
  };

  const handleDeleteIconClick = () => {
    setCountry(null);
    setCountryName(null);
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
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="country-select-small">Countries</InputLabel>
        <Select
          labelId="country-select-small"
          id="country-select-small"
          value={countryName}
          label="Coun"
          onChange={handleChangeCountryName}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {countryNames.map((countryName) => {
            return <MenuItem value={countryName}>{countryName}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleSearchClick}
        disabled={!countryName}
      >
        Search
      </Button>

      {country && (
        <>
          <IconButton aria-label="delete" onClick={handleDeleteIconClick}>
            <DeleteIcon />
          </IconButton>
          <CountryDetail country={country} />
        </>
      )}
    </div>
  );
}

export default App;
