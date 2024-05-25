import mysql2 from "mysql2";
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

export default connection;
