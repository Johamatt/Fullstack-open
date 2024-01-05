import express from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { PersonModel } from "./mongo";
import { errorHandler, unknownEndpoint } from "./errHandler";

dotenv.config();
var morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.static("./dist"));

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token("body", (req: Request, res: Response) => JSON.stringify(req.body));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/info", (req: Request, res: Response, next: NextFunction) => {
  PersonModel.find({})
    .then((persons: any[]) => {
      res.send(
        `Phonebook has info for ${persons.length} people<br><br>` + new Date()
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (req: Request, res: Response, next: NextFunction) => {
  PersonModel.find({})
    .then((persons: any[]) => {
      res.json(persons);
    })
    .catch((error) => next(error));
});

app.get(
  "/api/persons/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    PersonModel.findById(req.params.id)
      .then((person) => {
        if (person) {
          res.json(person);
        } else {
          res.status(404).end();
        }
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
);

app.delete(
  "/api/persons/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    PersonModel.findByIdAndDelete(req.params.id)
      .then((person) => {
        if (person) {
          res.json(person);
        } else {
          res.status(404).end();
        }
      })
      .catch((error) => next(error));
  }
);

app.post("/api/persons", (req: Request, res: Response, next: NextFunction) => {
  const person = new PersonModel(req.body);

  if (person.name === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  person
    .save()
    .then((addedPerson: any) => {
      res.json(addedPerson);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

app.put(
  "/api/persons/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const person = new PersonModel(req.body);

    PersonModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .then((updatedPerson) => {
        res.json(updatedPerson);
      })
      .catch((error) => next(error));
  }
);

app.use(unknownEndpoint);
app.use(errorHandler);
