interface SearchBarProps {
  fetch: (event: React.FormEvent<HTMLFormElement>) => void;
  setSearch: (number: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setSearch, fetch }) => {
  return (
    <form onSubmit={fetch}>
      <h2>add new</h2>
      <div>
        find countries:{" "}
        <input onChange={(event) => setSearch(event.target.value)} />
      </div>
      <div>
        <button type="submit">Search</button>
      </div>
    </form>
  );
};
