import express, { request } from "express";
import { Request, Response, NextFunction } from "express";
var morgan = require("morgan");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

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
  res.json(persons);
});

app.get("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const note = persons.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  persons = persons.filter((note) => note.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req: Request, res: Response) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  if (persons.map((person) => person.name).includes(body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  const note = {
    name: body.name,
    number: body.number || false,
    id: Math.floor(Math.random() * 1000000),
  };
  persons = persons.concat(note);
  res.json(note);
});

let persons = [
  { id: 1, name: "Kiley", number: "134-358-8841" },
  { id: 2, name: "Ricki", number: "303-884-5455" },
  { id: 3, name: "Reggie", number: "491-493-1594" },
  { id: 4, name: "Nahum", number: "624-622-1192" },
  { id: 5, name: "Nita", number: "461-435-3259" },
  { id: 6, name: "Liva", number: "939-340-2244" },
];
