import React, { useState } from "react";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Complaint from "./Complaint";
import User from "./User";
import DashForm from "./DashForm";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/complaint" element={<Complaint />}>
        {" "}
      </Route>
      <Route exact path="/user" element={<User />}></Route>
      <Route exact path="/create" element={<DashForm />}></Route>

      <Route exact path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
