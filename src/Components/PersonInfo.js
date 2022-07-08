import React from "react";

function PersonInfo(props) {
  const person = props.person;

  return (
    <div>
      <h1>
        {`${person.name} ${person.lastName} ${person.birth.date} tarihinde ${person.birth.place} noktasında dünyaya geldi`}
      </h1>
    </div>
  );
}

export default PersonInfo;
