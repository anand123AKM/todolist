import React, { useContext, useState, useEffect } from "react";
import { MdAddComment } from "react-icons/md";
import { UserContext } from "./UserContext";
import { db, collection, doc, setDoc } from "./firebase";

const AddTodo = ({ onclick }) => {
  const { userId } = useContext(UserContext);
  const [todoName, settodoName] = useState("");
  const [todoDueDate, settodoDueDate] = useState("");
  const [id, setid] = useState("");
  const handleNameChange = (event) => {
    settodoName(event.target.value);
  };
  const handleDateChange = (event) => {
    settodoDueDate(event.target.value);
  };

  const handlesnum = (event) => {
    setid(event.target.value);
  };

  const handleAddButtonClick = () => {
    onclick(todoName, todoDueDate, id);
    settodoDueDate("");
    settodoName("");
    setid("");
  };

  async function saveTask() {
    const todosCollection = collection(db, "users", userId, "todos");
    const todoDoc = doc(todosCollection);
    await setDoc(todoDoc, { task: todoName, dueDate: todoDueDate, id: id });
  }

  return (
    <div className="container text-center">
      <div className="sno">
        <input
          type="number"
          placeholder="input s. no."
          className="snoinp"
          value={id}
          required
          onChange={handlesnum}
        />
        <h3 className="snin">add upto 5 task</h3>
      </div>
      <div className="row row2">
        <div className="col-6 ta">
          <input
            className="todoadd"
            type="text"
            placeholder="Enter Todo Here"
            value={todoName}
            required
            onChange={handleNameChange}
          />
        </div>
        <div className="col-4 td">
          <input
            className="tododateadd"
            type="date"
            placeholder="Due Date"
            name=""
            id=""
            required
            value={todoDueDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="col-2 btn3">
          <button
            type="button"
            className="button3 btn-primary button2"
            onClick={() => {
              handleAddButtonClick();
              if (userId) {
                saveTask();
              } else {
                console.log("User ID is null");
              }
            }}
          >
            <MdAddComment />
          </button>
        </div>
      </div>
      <div className="pen">Pending Task </div>
    </div>
  );
};

export default AddTodo;
