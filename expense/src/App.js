import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing.js";
import Login from "./pages/Login.js";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Savings from "./pages/Savings";
import Expenses from "./pages/Expenses.js";
import Transactions from "./pages/Transactions.js";
import EditProfile from "./pages/EditProfile.js";
import UserProvider from "./UserProvider.js";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
