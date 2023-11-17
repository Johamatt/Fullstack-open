import { deleteP } from "../axios";
import { Person } from "../types";

interface PersonsProps {
  filter: string;
  persons: Array<Person>;
  showInfoBox: (msg: string, type: string) => void;
}

export const Persons: React.FC<PersonsProps> = ({
  persons,
  filter,
  showInfoBox,
}) => {
  const handleDelete = async (person: Person) => {
    const infobox = await deleteP(person);
    showInfoBox(infobox.msg, infobox.type);
  };

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
                confirm(`Delete ${person.name}?`) ? handleDelete(person) : null
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
