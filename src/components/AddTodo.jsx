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
  const [id, setid] = useState("");
  const handlesnum = (event) => {
    setid(event.target.value);
  };
 
const handleAddButtonClick = () => {
  onclick( todoName, todoDueDate,id );
  settodoDueDate("");
  settodoName("");
  setid("");
};


  return (
    <div className="container text-center">
          <div className="sno">
<input type="number" placeholder="input s. no." className="snoinp" value={id} required onChange={handlesnum}  />
<h3 className="snin" >𝗔𝗱𝗱 𝘂𝗽 𝘁𝗼 5 𝗧𝗮𝘀𝗸 𝗽𝗲𝗿 𝗱𝗮𝘆</h3>
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
