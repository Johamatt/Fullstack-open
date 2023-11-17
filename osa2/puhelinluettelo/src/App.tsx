import { useEffect, useState } from "react";
import { PersonForm } from "./Components/PersonForm";
import { Filter } from "./Components/Filter";
import { Persons } from "./Components/Persons";
import { Person } from "./types";
import { create, getAll, update } from "./axios";

const App = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = async (event: any) => {
    event.preventDefault();

    const existingPerson = persons.find((a) => a.name === newName);

    if (existingPerson) {
      const person: Person = {
        name: newName,
        number: newNumber,
        id: existingPerson.id,
      };
      {
        window.confirm(
          `${newName} is already added to phoneboot, replace the old number with new one?`
        )
          ? update(person)
          : null;
      }
    } else {
      try {
        const person: Person = {
          name: newName,
          number: newNumber,
          id: Math.floor(Math.random() * 10000),
        };
        await create(person);
        const personsDB: Array<Person> = await getAll();
        setPersons(personsDB);
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const personsDB: Array<Person> = await getAll();
        setPersons(personsDB);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
