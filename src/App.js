import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Home from "./pages/Home";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const User = { id: "1@gmail.com", pw: "A!11111111" };
  // return isLogin ? <Home /> : <Login setIsLogin={setIsLogin} />;
  return (
    <div>
      <Routes>
        <Route exact path="*" element={<Home id={User.id} />} />
        <Route
          exact
          path="/login"
          element={<Login id={User.id} pw={User.pw} />}
        />
      </Routes>
    </div>
  );
}

export default App;
