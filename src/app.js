import connection from "./database.js";
import express from "express";
const app = express();
app.use(express.json());
import cors from "cors";
import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(cors());

app.post("/todos", (req, res) => {
  const id = req.body.id;
  const todo = req.body.todo;
  const date = req.body.date;

  const query = "INSERT INTO list(todo, date, id) VALUES (? ,?, ?)";
  connection.query(query, [todo, date, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).json({ status: "ok", results });
    }
  });
});

app.get("/todos", (req, res) => {
  const query = "SELECT * FROM list";
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: "error" });
    } else {
      console.log(results);
      res.json({ results });
    }
  });
});

app.delete("/todos", (req, res) => {
  const todo = req.body.todo;
  const query = "DELETE FROM list WHERE todo = ?";
  connection.query(query, [todo], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).json({ status: "ok", results });
    }
  });
});

app.put("/todos", (req, res) => {
  const todo = req.body.todo;
  const date = req.body.date;
  const id = req.body.id;
  const query = "UPDATE list SET date = ? , todo=? WHERE id = ?";
  connection.query(query, [date, todo, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: "error" });
    } else {
      res.status(200).json({ status: "ok", results });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
