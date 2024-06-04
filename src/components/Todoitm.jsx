import React from "react";
import TodoItem from "./TodoItem";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import { query, where } from "firebase/firestore";

const Todoitm = ({
  userId,
  onDeleteClick,
  onEditClick,
  onSaveEdit,
  editingItem,
}) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const q = query(
      collection(db, "users", userId, "todos"),
      where("completed", "==", false)
    );
    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(todos.id);
    return todos;
  };
  useEffect(() => {
    const fetchData = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };

    fetchData();
  }, [userId]);

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
            userId={userId}
            key={item.name}
            todoName={item.name}
            toDate={item.date}
            id={item.id}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
            onSaveEdit={onSaveEdit}
            isEditing={item.name === editingItem}
          />
        ))}
      </div>
    </>
  );
};

export default Todoitm;
