import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostApi from "./components/PostApi";
import Results from "./components/Results";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostApi />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
