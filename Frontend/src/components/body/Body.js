import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";

import Home from "../body/home/Home";

import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Routes>
        <Route
          path="/"
          element={isLogged ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/login"
          element={isLogged ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLogged ? <Navigate to="/dashboard" /> : <Register />}
        />
       
      </Routes>
    </section>
  );
}

export default Body;
