import React from "react";
import { useState } from "react";
import { MdAddComment } from "react-icons/md";

const AddTodo = ({ onclick }) => {
  const [todoName, settodoName] = useState("");
  const [todoDueDate, settodoDueDate] = useState("");
  const handleNameChange = (event) => {
    settodoName(event.target.value);
  };
  const handleDateChange = (event) => {
    settodoDueDate(event.target.value);
  };
  const handleAddButtonClick = () => {
    onclick(todoName, todoDueDate);
    settodoDueDate("");
    settodoName("");
  };

  return (
    <div className="container text-center">
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
            className="btn btn-success button2"
            onClick={handleAddButtonClick}
          >
            <MdAddComment />
          </button>
        </div>
      </div>
       <div className="pen">Pending Task</div>
    </div>
  );
};

export default AddTodo;
