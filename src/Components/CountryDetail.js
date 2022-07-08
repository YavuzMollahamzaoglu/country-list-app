import React from "react";

function CountryDetail(props) {
  const country = props.country;
  
  return (
    <div>
      {country.name.official}
      <p>
        Capital city of {country.name.common} is {country.capital}
      </p>
      <img src={country.flags.png} height={100} width={100} />
    </div>
  );
}

export default CountryDetail;
