import axios from "axios";
import { Person } from "../types";
const baseUrl = "/api/persons";

// const baseUrl = "http://localhost:3001/api/persons";

export const getAll: () => Promise<Person[]> = async () => {
  const request: Array<Person> = await axios
    .get(baseUrl)
    .then((response) => response.data);
  return request;
};

export const create = async (person: Person) => {
  try {
    await axios.post(baseUrl, person);
    return { msg: `${person.name} created`, type: "success" };
  } catch (e: any) {
    return { msg: e.response.data.error, type: "error" };
  }
};

export const update = async (person: Person) => {
  try {
    await axios.put(`${baseUrl}/${person._id}`, person);
    return { msg: `${person.name} updated`, type: "success" };
  } catch (e: any) {
    return { msg: e.response.data.error, type: "error" };
  }
};

export const deleteP = async (person: Person) => {
  console.log(person);
  try {
    //@ts-ignore
    await axios.delete(`${baseUrl}/${person._id}`);
    return { msg: `${person.name} deleted`, type: "success" };
  } catch (e: any) {
    return { msg: e.response.data.error, type: "error" };
  }
};
