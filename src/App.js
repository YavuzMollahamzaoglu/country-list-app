import React, { useState, useEffect } from "react";
import { Alert, Button, TextField } from "@mui/material";
import CountryDetail from "./Components/CountryDetail";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";

function App() {
  const [countryName, setCountryName] = useState("");
  const [country, setCountry] = useState();
  const [countryNames, setCountryNames] = useState([]);
  const [radioValue, setRadioValue] = React.useState("Select");
  const [checked, setChecked] = React.useState(true);

  useEffect(() => {
    console.log("hav hav");

    if (!checked) {
      handleSearchClick();
    }
  }, [countryName]);

  useEffect(() => {
    if (radioValue === "TextField") {
      setChecked(true);
    }
  }, [radioValue]);

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

  const handleChangeAutoComplete = (event, value) => {
    setCountryName(value);
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

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  console.log(radioValue);

  const handleCheckBoxChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };

  return (
    <div>
      {radioValue === "Select" && (
        <Checkbox
          label="label"
          checked={checked}
          onChange={handleCheckBoxChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      )}

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Country Name Component
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={radioValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="TextField"
            control={<Radio />}
            label="TextField"
          />
          <FormControlLabel value="Select" control={<Radio />} label="Select" />

          <FormControlLabel
            value="Autocomplete"
            control={<Radio />}
            label="Autocomplete"
          />
        </RadioGroup>
      </FormControl>

      {radioValue === "Select" && (
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
      )}
      {(checked === true ||
        radioValue === "TextField" ||
        radioValue === "Autocomplete") && (
        <Button
          variant="contained"
          onClick={handleSearchClick}
          disabled={!countryName}
        >
          Search
        </Button>
      )}

      {country && (
        <>
          <IconButton aria-label="delete" onClick={handleDeleteIconClick}>
            <DeleteIcon />
          </IconButton>
          <CountryDetail country={country} />
        </>
      )}

      {radioValue === "TextField" && (
        <TextField
          id="standard-basic"
          label="Select Countries"
          variant="standard"
          onChange={handleChangeCountryName}
        />
      )}

      {radioValue === "Autocomplete" && (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={countryNames}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Countries" />}
          onChange={handleChangeAutoComplete}
        />
      )}
    </div>
  );
}

export default App;
