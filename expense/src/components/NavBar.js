import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

const NavBar = () => {
  const { updateUser } = useContext(UserContext);
  const [isSettingsClicked, setSettingsClicked] = useState(false);

  const handleSettingsClick = () => {
    if (isSettingsClicked === true) {
      setSettingsClicked(false);
      return;
    } else {
      setSettingsClicked(true);
    }
  };

  const handleLogout = () => {
    updateUser(null);
  };

  return (
    <div className="h-24 w-screen">
      <div className="h-24 w-screen px-32 flex">
        <div className="h-full w-1/12 text-4xl font-bold text-yellow-400 flex items-center">
          <Link to="/home" className="hover:text-white">
            SpendR
          </Link>
        </div>
        <div className="h-full w-full font-semibold flex items-center justify-end text-yellow-400">
          <div>
            <Link to="/savings" className="px-6">
              <button className="h-12 w-28 hover:text-white">Savings</button>
            </Link>
          </div>
          <div>
            <Link to="/expenses" className="px-6">
              <button className="h-12 w-28 hover:text-white">Expenses</button>
            </Link>
          </div>
          <div>
            <Link to="/transactions" className="px-9">
              <button className="h-12 w-28 hover:text-white">
                Transactions
              </button>
            </Link>
          </div>

          {isSettingsClicked && (
            <div className="flex flex-row">
              <div>
                <Link to="/editprofile" className="px-6">
                  <button className="h-12 w-28 hover:text-white">
                    Edit Profile
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/" className="pr-4">
                  <button
                    className="h-12 w-28 hover:text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          )}

          <div className="h-8 flex items-center justify-center rounded-lg hover:bg-white">
            <button
              className="h-12 w-fit text-base text-red-600 flex items-center justify-center"
              onClick={handleSettingsClick}
            >
              <img
                src="/images/settings-red.png"
                alt="edit"
                className="w-6 h-6 mx-8"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
