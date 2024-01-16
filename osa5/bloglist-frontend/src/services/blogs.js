import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getOne = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

const deleteBlog = async (id, blog) => {
  try {
    const config = {
      headers: { Authorization: token },
      data: blog,
    };
    const res = await axios.delete(`${baseUrl}/${id}`, config); // Pass the configuration object as the second parameter
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(`${baseUrl} /${id}`);
  const request = axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken, getOne, deleteBlog };