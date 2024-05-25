import React from "react";
import TodoItem from "./TodoItem";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";

const Todoitm = ({
  // todo,
  userId,
  onDeleteClick,
  onEditClick,
  onSaveEdit,
  editingItem,
}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const todosSnapshot = await getDocs(
        collection(doc(db, "users", userId), "todos")
      );
      const todosData = todosSnapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: docData.id,
          name: docData.task,
          date: docData.dueDate,
        };
      });
      setTodos(todosData);
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <div className="items-container">
        {todos.map((item) => (
          <TodoItem
            key={item.name}
            todoName={item.name}
            toDate={item.date}
            id={item.id}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
            onSaveEdit={onSaveEdit}
            isEditing={item === editingItem}
          />
        ))}
      </div>
    </>
  );
};

export default Todoitm;
