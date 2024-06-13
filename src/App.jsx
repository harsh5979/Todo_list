import React from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

const App = () => {
  return (
    <div className="bg-white/60  bg-gradient-to-r from-white/50 to-blue-400 h-auto ">
      <Navbar />
      <div className="h-auto">
        <Todo />
      </div>
    </div>
  );
};

export default App;
