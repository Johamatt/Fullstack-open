import { useEffect, useState } from "react";
import { PersonForm } from "./Components/PersonForm";
import { Filter } from "./Components/Filter";
import { Persons } from "./Components/Persons";
import { InfoBox, Person } from "./types";
import { create, getAll, update } from "./axios";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [infobox, setInfobox] = useState<InfoBox | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personsDB: Array<Person> = await getAll();
        setPersons(personsDB);
      } catch {}
    };
    fetchData();
  }, [infobox]);

  const showInfoBox = (msg: string, type: string) => {
    setInfobox({ type: type, msg: msg });
    setTimeout(() => {
      setInfobox(undefined);
    }, 5000);
  };

  const addPerson = async (event: any) => {
    event.preventDefault();
    const existingPerson = persons.find((a) => a.name === newName);
    if (existingPerson) {
      const msg = `${newName} is already added to phoneboot, replace the old number with new one?`;
      window.confirm(msg)
        ? (async () => {
            const person: Person = {
              name: newName,
              number: newNumber,
              id: existingPerson.id,
            };
            const infobox = await update(person);
            showInfoBox(infobox.msg, infobox.type);
          })()
        : null;
    } else {
      const person: Person = {
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * 10000),
      };
      const infobox = await create(person);
      showInfoBox(infobox.msg, infobox.type);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {infobox !== undefined ? (
        <p className={infobox.type}>{infobox.msg}</p>
      ) : (
        <div />
      )}
      <Filter setFilter={setFilter} />
      <PersonForm
        addPerson={addPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} showInfoBox={showInfoBox} />
    </div>
  );
};

export default App;
