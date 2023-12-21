// import "./App.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../UserContext";

function Login() {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [useData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const fetchUserData = () => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = useData.find((user) => user.username === username);

    if (user) {
      setEmailError(false);
      if (user.password === password) {
        setPasswordError(false);
        updateUser(user.user_id);
        navigate("/home");
      } else {
        setPasswordError(true);
      }
    } else {
      setEmailError(true);
    }
  };

  return (
    <div className="bg-blue-950 h-screen w-screen flex items-center justify-center">
      <div className="h-[500px] w-[600px] border border-indigo-950 bg-white shadow-2xl rounded-lg flex flex-col text-blue-950 px-6">
        <div>
          <div className="mt-8 font-bold text-3xl flex justify-center">
            SpendR
          </div>
          <div className="text-md flex justify-center	">
            Your companion to financial freedom.
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-y-6 mt-8">
            <div>
              <label className="text-sm font-thin">Username</label>
              <input
                type="text"
                onChange={handleUsernameChange}
                className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
              />
              {emailError && <p className="text-red-500">User not found</p>}
            </div>
            <div>
              <label className="text-sm font-thin">Password</label>
              <input
                type="password"
                onChange={handlePasswordChange}
                className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
              />
              {passwordError && (
                <p className="text-red-500">Incorrect password</p>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4 flex-row">
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 border border-blue-100 rounded-lg"
              />
              <label className="text-sm font-thin">Remember Me</label>
            </div>

            <div className="flex ml-auto">
              <label className="text-xs font-thin italic">
                Forgot Password?
              </label>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-blue-950 text-white h-12 w-3/5 rounded-lg shadow-lg">
              Login
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-2">
          <Link to="/registration">
            <label className="text-xs font-thin italic hover:text-yellow-500">
              Don't have an account? Register!
            </label>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
