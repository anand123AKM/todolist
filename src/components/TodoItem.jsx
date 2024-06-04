import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { collection, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getDocs, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

const TodoItem = ({
  userId,
  todoName,
  toDate,
  id,
  onEditClick,
  onSaveEdit,
  isEditing,
}) => {
  console.log("TodoItem", id, todoName);
  const [editedName, setEditedName] = useState(todoName);
  const [editedDate, setEditedDate] = useState(toDate);

  const handleDelete = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "todos")
      );
      querySnapshot.forEach(async (document) => {
        const docid = document.id;
        const task = document.data().task;
        console.log(`Document ID: ` + docid);
        console.log(`Task: ` + task);
        console.log(`Todo Name: ` + todoName);

        if (task === todoName) {
          try {
            const todoRef = doc(db, "users", userId, "todos", docid);
            await deleteDoc(todoRef);
            console.log("Document successfully deleted!");
          } catch (e) {
            console.error("Error deleting document: ", e);
          }
        }
      });
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  };

  const handleSaveEdit = async () => {
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
          <div className="col-2 dlbtn">
            <button
              type="button"
              onClick={() => {
                handleDelete();
              }}
              className="btn btn-danger button2"
            >
              <MdDelete />
            </button>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
