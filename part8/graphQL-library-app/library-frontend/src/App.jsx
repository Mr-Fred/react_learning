import {Routes, Route, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserProfile from "./components/UserProfile";

import { BOOK_ADDED, ALL_BOOKS } from "./lib/queries";
import { updateCache } from "./lib/helpers";

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    username: null,
    favoriteGenre: null,
    token: null
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      if (data?.data?.bookAdded) {
        window.alert(`${data.data.bookAdded.title} added`);
        updateCache(client.cache, {query: ALL_BOOKS}, data.data.bookAdded);
      }
    },
  });
  

  useEffect(() => {
    setCurrentUser({
      username: localStorage.getItem('library-user'),
      favoriteGenre: localStorage.getItem('user-favorite-genre'),
      token: localStorage.getItem('token')
    })
  },[])

  if(currentUser.token === null){
    return (
      <div>
        <LoginForm setCurrentUser={setCurrentUser}/>
        <RegisterForm />
      </div>
    )
  }
  
  const padding = {
    padding: 5
  }

  const logout = () => {
    setCurrentUser({
      username: null,
      favoriteGenre: null,
      token: null
    })
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/authors">authors</Link>
        <Link style={padding} to="/books">books</Link>
        <Link style={padding} to="/add">add book</Link>
        <Link style={padding} to="/user">profile</Link>
        <button onClick={logout}>logout</button>
      </div>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/user" element={<UserProfile user={currentUser}/>} />
      </Routes>

      <div>
      </div>
    </div>
  );
};

export default App;
