import React from "react";
import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import "./app.css";
import Todoitm from "./components/Todoitm";
import { WelcomeMsg } from "./components/WelcomeMsg";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const initialMenuApi = JSON.parse(localStorage.getItem("todoItems")) || [];
  let [MenuApi, setmenuApi] = useState(initialMenuApi);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(MenuApi));
  }, [MenuApi]);

  const onNewItem = (itemName, itemDueDate) => {
    if (!itemName) {
      alert("PLEASE FILL THE TODO");
    } else if (!itemDueDate) {
      alert("PLEASE FILL THE DATE");
    } else {
      const newMenuItem = { name: itemName, dueDate: itemDueDate };
      const newMenuApi = [...MenuApi, newMenuItem];
      setmenuApi(newMenuApi);
    }
  };

  const handledeleteitem = (todoitemname) => {
    const newTodoitems = MenuApi.filter((item) => item.name !== todoitemname);
    setmenuApi(newTodoitems);
  };

  function clearall() {
    const newNmenu = [];
    setmenuApi(newNmenu);
  }
  const handleEditItem = (todoItemName) => {
    const itemToEdit = MenuApi.find((item) => item.name === todoItemName);
    setEditingItem(itemToEdit);
  };

  const handleSaveEdit = (updatedName, updatedDueDate) => {
    const updatedMenuApi = MenuApi.map((item) => {
      if (item === editingItem) {
        return { ...item, name: updatedName, dueDate: updatedDueDate };
      }
      return item;
    });
    setmenuApi(updatedMenuApi);
    setEditingItem(null);
  };

  return (
    <center className="todo-container">
      <AppName></AppName>
      <AddTodo onclick={onNewItem}></AddTodo>
      {MenuApi.length === 0 && <WelcomeMsg></WelcomeMsg>}
      <Todoitm
        todo={MenuApi}
        onEditClick={handleEditItem}
        onDeleteClick={handledeleteitem}
        onSaveEdit={handleSaveEdit}
        editingItem={editingItem}
      ></Todoitm>
      <div className="clr">
        <button onClick={clearall} className="clearbutton">
          CLEAR LIST
        </button>
      </div>
    </center>
  );
};

export default App;
