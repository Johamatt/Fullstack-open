interface PersonFormProps {
  addPerson: (event: any) => void;
  setNewName: (name: string) => void;
  setNewNumber: (number: string) => void;
}

export const PersonForm: React.FC<PersonFormProps> = ({
  addPerson,
  setNewName,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <h2>add new</h2>
      <div>
        name: <input onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
