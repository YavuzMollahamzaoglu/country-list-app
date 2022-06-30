import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function App() {
  const [countryName, setCountryName] = useState([]);

  const handleCountryNameChange = (e) => {
    setCountryName(e.target.value);
  };

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Search Countries"
        variant="standard"
        onChange={handleCountryNameChange}
      />
      <Button variant="contained">Search</Button>
    </div>
  );
}

export default App;
