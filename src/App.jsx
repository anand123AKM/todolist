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
import { auth, db, collection, doc } from "./components/firebase";
import { getDoc, getDocs } from "firebase/firestore";
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

        const usersCollection = collection(db, "users");
        const userDoc = doc(usersCollection, user.uid);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setName(userData.name);
        }
      } else {
        setIsLoggedIn(false);
        setUserId(null);
        setName("");
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newMenuApi = data.results.map((item) => {
          const date = new Date(item.date);
          const formattedDate = `${("0" + date.getDate()).slice(-2)}-${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)}-${date.getFullYear()}`;
          return {
            name: item.todo,
            dueDate: formattedDate,
            id: item.id,
          };
        });
        setmenuApi(newMenuApi);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const onNewItem = (itemName, itemDueDate, id) => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: itemName, date: itemDueDate, id: id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

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
      .catch((error) => console.error("Error:", error));
    const newTodoitems = MenuApi.filter((item) => item.name !== todoitemname);
    setmenuApi(newTodoitems);
  };
  function clearall() {
    const newNmenu = [];
    setmenuApi(newNmenu);
  }

  const handleEditItem = async (todoItemName) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "todos")
      );
      querySnapshot.forEach((doc) => {
        const docid = doc.id;
        console.log(`Document ID: ` + docid);
        console.log(JSON.stringify(todoItemName));
        const docname = JSON.stringify(doc.data().task);
        console.log(`Document data:` + docname);
        if (docname === todoItemName) {
          const itemToEdit = MenuApi.find(() => docname === todoItemName);
          console.log("Item to edit:", itemToEdit);
          setEditingItem(itemToEdit);
        } else {
          console.log("Item not found");
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveEdit = (updatedName, updatedDueDate, id) => {
    fetch("http://localhost:3000/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: updatedName, date: updatedDueDate, id: id }),
    })
      .then(() => {
        return fetch("http://localhost:3000/todos");
      })
      .then((response) => response.json())
      .then((data) => {
        const newMenuApi = data.results.map((item) => {
          const date = new Date(item.date);
          const formattedDate = `${("0" + date.getDate()).slice(-2)}-${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)}-${date.getFullYear()}`;
          return {
            name: item.todo,
            dueDate: formattedDate,
            id: item.id,
          };
        });
        setmenuApi(newMenuApi);
      });
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
