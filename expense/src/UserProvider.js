import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  // Load user data from localStorage when the application starts
  const storedUserId = localStorage.getItem("userId");
  const [user, setUser] = useState(
    storedUserId ? parseInt(storedUserId, 10) : null
  );

  useEffect(() => {
    // Save user data to localStorage whenever it is updated
    if (user !== null) {
      localStorage.setItem("userId", user.toString());
    }
  }, [user]);

  const updateUser = (userId) => {
    setUser(userId);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
