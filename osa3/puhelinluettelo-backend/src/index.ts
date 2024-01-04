import express from "express";
import persons = require("./data.json");
console.log(persons);

const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.json());

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/info", (req: any, res: any) => {
  res.send(
    `Phonebook has info for ${persons.length} people<br><br>` + new Date()
  );
});

app.get("/api/persons", (req: any, res: any) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((note) => note.id !== id);

//   response.status(204).end();
// });

// app.post("/api/persons", (request, response) => {
//   const body = request.body;

//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   };

//   persons = persons.concat(note);

//   response.json(note);
// });

// let persons = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];
