import { deleteP } from "../axios";
import { Person } from "../types";

interface PersonsProps {
  filter: string;
  persons: Array<Person>;
}

export const Persons: React.FC<PersonsProps> = ({ persons, filter }) => {
  return (
    <div>
      {persons.map((person, index) =>
        person.name.toLowerCase().includes(filter) ? (
          <div key={index}>
            <p>
              {person.name} - {person.number}
            </p>
            <button
              onClick={() =>
                confirm(`Delete ${person.name}?`) ? deleteP(person.id) : null
              }
            >
              Delete
            </button>
          </div>
        ) : (
          <div />
        )
      )}
    </div>
  );
};
