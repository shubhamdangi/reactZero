// import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  const [newname, setNewname] = useState("");
  const [newcity, setNewCity] = useState("");
  const [company, setCompany] = useState("");

  //to get data from db
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  });

  // to add data to db
  const createUser = async () => {
    await addDoc(userCollectionRef, {
      name: newname,
      city: newcity,
      company: company,
    });
  };

  return (
    <div className="App">
      <input
        placeholder="enter name.."
        onChange={(e) => setNewname(e.target.value)}
      />
      <input
        placeholder="enter city.."
        onChange={(e) => setNewCity(e.target.value)}
      />
      <input
        placeholder="enter company"
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={createUser}>Submit</button>

      {users.map((user) => {
        return (
          <div>
            <h1>{user.name}</h1>
            <h1>{user.city}</h1>
            <h1>{user.company}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
