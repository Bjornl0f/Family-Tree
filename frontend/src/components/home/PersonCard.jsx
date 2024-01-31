import React from "react";
import PersonSingleCard from "./PersonSingleCard"

const PersonCard = ({ people }) => {
  // Helper function to generate a unique key for each SVG line
  const generateKey = (person1, person2) => `${person1.id}-${person2.id}`;
  return (
    <div>
        {people.map((person, index) => (
          <React.Fragment key={index}>
            <PersonSingleCard person={person} />

            {/* Draw lines to connect related people */}
            {person.relations && person.relations.map((relatedPerson) => (
              <svg
                key={generateKey(person, relatedPerson)}
                className="absolute top-0 left-1/2 transform -translate-x-1/2"
                height="50"
                width="2"
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="50"
                  stroke="#000"
                  strokeWidth="2"
                />
              </svg>
            ))}
          </React.Fragment>
        ))}
    </div>
  )
}

export default PersonCard