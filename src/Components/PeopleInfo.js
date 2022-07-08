import React from "react";

function PeopleInfo(props) {
  const people = props.people;

  return (
    <div>
      {people.map((val) => {
        return (
          <h1>
            {`${val.name} ${val.lastName} ${val.birth.date} tarihinde ${val.birth.place} noktasında dünyaya geldi`}{" "}
          </h1>
        );
      })}
    </div>
  );
}

export default PeopleInfo;
