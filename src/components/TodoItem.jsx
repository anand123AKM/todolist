import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const TodoItem = ({
  todoName,
  toDate,
  onDeleteClick,
  onEditClick,
  onSaveEdit,
  isEditing,
}) => {
  const [editedName, setEditedName] = useState(todoName);
  const [editedDate, setEditedDate] = useState(toDate);

  const handleSaveEdit = () => {
    onSaveEdit(editedName, editedDate);
  };

  return (
    <div className="container">
      <div className="row row2">
        <div className="col-4">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            todoName
          )}
        </div>
        <div className="col-4">
          {isEditing ? (
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          ) : (
            toDate
          )}
        </div>
        <div className="col-2 ">
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
        <div className="col-2">
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
  );
};

export default TodoItem;
