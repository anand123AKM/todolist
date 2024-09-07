import React from "react";
import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import "./app.css";
import Todoitm from "./components/Todoitm";
import { NameContext } from "./components/NameContext";
import { useState } from "react";
import { useEffect } from "react";
import Info from "./components/info";
import Footer from "./components/footer";
import { AuthContext } from "./components/AuthContext";
import Login from "./components/log";
import { UserContext } from "./components/UserContext";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const initialMenuApi = JSON.parse(localStorage.getItem("todoItems")) || [];
  let [MenuApi, setmenuApi] = useState(initialMenuApi);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
      } else {
        setIsLoggedIn(false);
        setUserId(null);
        setName("");
      }
    });

    return unsubscribe;
  }, []);

  const onNewItem = (itemName, itemDueDate, id) => {
    if (!id) {
      alert("PLEASE FILL THE ID");
    } else if (!itemName) {
      alert("PLEASE FILL THE TODO");
    } else if (!itemDueDate) {
      alert("PLEASE FILL THE DATE");
    } else {
      const newMenuItem = { name: itemName, dueDate: itemDueDate, id: id };
      const newMenuApi = [...MenuApi, newMenuItem];
      setmenuApi(newMenuApi);
    }
  };

  const handledeleteitem = (itemName) => {
    const newMenuApi = MenuApi.filter((item) => item.name !== itemName);
    setmenuApi(newMenuApi);
  };

  function clearall() {
    const newNmenu = [];
    setmenuApi(newNmenu);
  }

  const [editingName, setEditingName] = useState("");
  const [editingDueDate, setEditingDueDate] = useState("");
  const handleEditItem = async (AddTodo, todoDate) => {
    setEditingItem(AddTodo);
    setEditingName(AddTodo);
    setEditingDueDate(todoDate);
  };

  const handleSaveEdit = (todoname, toDate, id) => {
    console.log("name", todoname);
    console.log("date", toDate);
    console.log("id", id);
    const updatedMenuApi = MenuApi.map((item) => {
      if (item.name === editingName) {
        return { ...item, name: todoname, dueDate: toDate };
      }
      return item;
    });
    setmenuApi(updatedMenuApi);
    setEditingItem(null);
  };
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(MenuApi));
    localStorage.setItem("editingItem", JSON.stringify(editingItem));
    localStorage.setItem("editingName", editingName);
    localStorage.setItem("editingDueDate", editingDueDate);
  }, [MenuApi, editingItem, editingName, editingDueDate]);

  return (
    <>
      <NameContext.Provider value={name}>
        <UserContext.Provider value={{ userId, setUserId }}>
          <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <div className={`main-div`}>
              {isLoggedIn ? (
                <div className="maindiv">
                  <center className="todo-container">
                    <AppName></AppName>
                    <Info></Info>
                    <AddTodo
                      setUserId={setUserId}
                      onclick={onNewItem}
                    ></AddTodo>
                    <Todoitm
                      userId={userId}
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
                    <div className="foot21">
                      <Footer></Footer>
                    </div>
                  </center>
                </div>
              ) : (
                <div className="log">
                  <Login />
                </div>
              )}
            </div>
          </AuthContext.Provider>
        </UserContext.Provider>
      </NameContext.Provider>
    </>
  );
};

export default App;
