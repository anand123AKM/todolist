import React from "react";
import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import "./app.css";
import Todoitm from "./components/Todoitm";
import { WelcomeMsg } from "./components/WelcomeMsg";
import { useState } from "react";
import { useEffect } from "react";
import Info from "./components/info";
import Footer from "./components/footer";

const App = () => {
  const initialMenuApi = JSON.parse(localStorage.getItem("todoItems")) || [];
  let [MenuApi, setmenuApi] = useState(initialMenuApi);
  const [editingItem, setEditingItem] = useState(null);

     useEffect(() => {
  fetch("http://localhost:3000/todos",{
    method:"GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(response => response.json())
.then(data => {
  const newMenuApi = data.results.map(item => {
    const date = new Date(item.date);
        const formattedDate = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    return {
      name: item.todo,
      dueDate: formattedDate,
      id: item.id
    };
  });
  setmenuApi(newMenuApi);
})
  .catch((error) => console.error('Error:', error));
}, []); 



  const onNewItem = ( itemName, itemDueDate,id) => {
       fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  todo: itemName, date: itemDueDate, id: id}),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));

      if (!id) {
      alert("PLEASE FILL THE ID");
      }
 else if (!itemName) {
      alert("PLEASE FILL THE TODO");
    } else if (!itemDueDate) {
      alert("PLEASE FILL THE DATE");
    } else {
      const newMenuItem = {name: itemName, dueDate: itemDueDate , id: id};
      const newMenuApi = [...MenuApi, newMenuItem];
      setmenuApi(newMenuApi);
    }
  };

  const handledeleteitem = (todoitemname) => {
    fetch("http://localhost:3000/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: todoitemname }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error)
      );
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


  const handleSaveEdit = (updatedName, updatedDueDate ,id ) => {
       fetch('http://localhost:3000/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({todo: updatedName, date: updatedDueDate, id:id }),
    })
     .then(() => {
    return fetch('http://localhost:3000/todos');
  })
  .then(response => response.json())
 .then(data => {
  const newMenuApi = data.results.map(item => {
    const date = new Date(item.date);
        const formattedDate = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    return {
      name: item.todo,
      dueDate: formattedDate,
      id: item.id
    };
  });
  setmenuApi(newMenuApi);
})
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
    <>
    <div className="maindiv" >
      <center className="todo-container">
      <AppName></AppName>
      <Info></Info>
      <AddTodo onclick={onNewItem}></AddTodo>
      {MenuApi.length === 0 && <WelcomeMsg></WelcomeMsg>}
      <Todoitm
        todo={MenuApi}
        onEditClick={handleEditItem}
        onDeleteClick={handledeleteitem}
        onSaveEdit={handleSaveEdit}
        editingItem={editingItem}
      ></Todoitm>
      <div className="clear">
        <button onClick={clearall} className="clearbutton">
          CLEAR LIST
        </button>
      </div>
       <div className="foot21">  <Footer></Footer></div>
    </center>
    </div>
     </>
  );
};

export default App;
