import React, { useState } from "react";
import "./App.css";
import Login from "./Login";
import Home from "./pages/Home";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? <Home /> : <Login setIsLogin={setIsLogin} />;
}

export default App;
