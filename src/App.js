import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Home from "./pages/Home";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  // return isLogin ? <Home /> : <Login setIsLogin={setIsLogin} />;
  return (
    <div>
      <Routes>
        <Route exact path="*" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
