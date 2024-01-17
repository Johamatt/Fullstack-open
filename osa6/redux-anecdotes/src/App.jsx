import { useSelector, useDispatch } from "react-redux";
import { voteIncrement, sortAnecdotes } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnexdoteList"
const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteIncrement(id));
    dispatch(sortAnecdotes());
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm />
    </div>
  );
};

export default App;
