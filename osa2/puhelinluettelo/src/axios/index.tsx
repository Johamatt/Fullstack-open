import axios from "axios";
import { Person } from "../types";
const baseUrl = "http://localhost:3001/persons";

export const getAll: () => Promise<Person[]> = async () => {
  const request: Array<Person> = await axios
    .get(baseUrl)
    .then((response) => response.data);

  return request;
};

export const create = async (person: Person) => {
  const request = axios.post(baseUrl, person).then((response) => response.data);
  return request;
};

export const update = (person: Person) => {
  const request = axios
    .put(`${baseUrl}/${person.id}`, person)
    .then((response) => response.data);
  return request;
};

export const deleteP = (id: number) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
