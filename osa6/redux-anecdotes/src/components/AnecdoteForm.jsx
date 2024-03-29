import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showMessage } from "../reducers/notificationReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(anecdote))

    dispatch(setNotification(`you created '${anecdote}'`, 5000)); 

  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
