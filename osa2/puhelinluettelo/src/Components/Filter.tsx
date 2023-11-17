interface FilterProps {
  setFilter: (event: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  return (
    <div>
      filter shown with:{" "}
      <input onChange={(event) => setFilter(event.target.value)} />
    </div>
  );
};
