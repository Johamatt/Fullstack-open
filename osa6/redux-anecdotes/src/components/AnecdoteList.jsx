import { useSelector, useDispatch } from "react-redux";
import { voteIncrement, sortAnecdotes } from "../reducers/anecdoteReducer";

import { setNotification } from "../reducers/notificationReducer";
const AdecdoteList = () => {

  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteIncrement(id));
    dispatch(sortAnecdotes());

    dispatch(setNotification(`you voted '${content}'`, 5)); 
  };

  const anecdotes = useSelector(({ filter, anecdotes }) => {
      return anecdotes.filter(anecdote => {
          return anecdote.content.includes(filter);
      });

  });
  
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdecdoteList;
