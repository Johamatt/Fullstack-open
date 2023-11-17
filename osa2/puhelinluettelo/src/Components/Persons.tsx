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
          <p key={index}>
            {person.name} - {person.number}
          </p>
        ) : (
          <div />
        )
      )}
    </div>
  );
};
