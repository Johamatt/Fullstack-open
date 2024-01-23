import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (id) => {
  const response = await axios.get(baseUrl + "/" + id);
  const anecdote = response.data;
  anecdote.votes += 1;
  const updatedResponse = await axios.put(`${baseUrl}/${id}`, anecdote);
  return updatedResponse.data;
};

export default { getAll, createNew, update };
