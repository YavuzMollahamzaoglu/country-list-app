import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

function App() {
  const [name, setCountryName] = useState([]);

  const handleCountryNameChange = (e) => {
    setCountryName(e.target.value);
    />

    } 
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
