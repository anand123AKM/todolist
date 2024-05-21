import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const TodoItem = ({
  todoName,
  toDate,
  id,
  onDeleteClick,
  onEditClick,
  onSaveEdit,
  isEditing,
}) => {
  const [editedName, setEditedName] = useState(todoName);
  const [editedDate, setEditedDate] = useState(toDate);

  const handleSaveEdit = () => {
    onSaveEdit(editedName, editedDate, id);
  };

  return (
    <div className="container container2">
      <div className="row row3">
        <div className="col-2 sno1">{id}.</div>
        <div
          style={{ color: "white", fontWeight: "bold", fontSize: "larger" }}
          className="col-4 addin"
        >
          {isEditing ? (
            <input
              className="inpdiv"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            todoName
          )}
        </div>
        <div
          style={{ color: "white", fontWeight: "bold", fontSize: "larger" }}
          className="col-4 addd"
        >
          {isEditing ? (
            <input
              className="inpdiv"
              type="text"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          ) : (
            toDate
          )}
        </div>
        <div className="bse">
          <div className="col-2 edbtn">
            {isEditing ? (
              <button className="save" onClick={handleSaveEdit} type="button">
                Save
              </button>
            ) : (
              <button
                className="edit"
                onClick={() => onEditClick(todoName, toDate)}
                type="button"
              >
                <FaRegEdit />
              </button>
            )}
          </div>
          <div className="col-2 dlbtn">
            <button
              type="button"
              onClick={() => onDeleteClick(todoName)}
              className="btn btn-danger button2"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
