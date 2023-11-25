import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Cert/Login";
import Signup from "./components/Cert/Signup";
import app from "./firebaseConfig";
import { getAuth } from "@firebase/auth";

// firebase functions
const auth = getAuth(app);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign_up" element={<Signup auth={auth} />} />
      </Routes>
    </Router>
  );
};

export default App;