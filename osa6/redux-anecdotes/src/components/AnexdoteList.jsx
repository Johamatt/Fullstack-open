import { useSelector, useDispatch } from "react-redux";
import { voteIncrement, sortAnecdotes } from "../reducers/anecdoteReducer";

const AdecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteIncrement(id));
    dispatch(sortAnecdotes());
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdecdoteList;
