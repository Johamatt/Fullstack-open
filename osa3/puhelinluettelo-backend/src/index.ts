import express, { request } from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const Person = require("./mongo.js");
var morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.static("./dist"));

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token("body", (req: Request, res: Response) => JSON.stringify(req.body));
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/info", (req: Request, res: Response) => {
  res.send(
    `Phonebook has info for ${persons.length} people<br><br>` + new Date()
  );
});

app.get("/api/persons", (req: Request, res: Response) => {
  Person.find({}).then((persons: any[]) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req: Request, res: Response) => {
  Person.findById(req.params.id).then((person: any) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  persons = persons.filter((note) => note.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req: Request, res: Response) => {
  const body = req.body;

  console.log(request.body);

  if (body.name === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number || false,
  });

  person.save().then((addedPerson: any) => {
    res.json(addedPerson);
  });
});

let persons = [
  { id: 1, name: "Kiley", number: "134-358-8841" },
  { id: 2, name: "Ricki", number: "303-884-5455" },
  { id: 3, name: "Reggie", number: "491-493-1594" },
  { id: 4, name: "Nahum", number: "624-622-1192" },
  { id: 5, name: "Nita", number: "461-435-3259" },
  { id: 6, name: "Liva", number: "939-340-2244" },
];

// type Person = {
//   id: number;
//   name: string;
//   number: string;
// };
