// note ma error sya basta dili unique ang email and username butangan lang error per anue para klaro pero laters
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import DeleteAccountPopup from "../components/DeleteAccountPopup";
import ConfirmPopUp from "../components/ConfirmPopup";
import VerticalNavBar from "../components/VerticalNavBar";
import UserContext from "../UserContext";

function EditProfile() {
  const { user } = useContext(UserContext);
  const [isSettingsClicked, setSettingsClicked] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordCorrect, setPasswordCorrect] = useState(true);
  const [profile, setProfile] = useState({
    full_name: "",
    age: 0,
    email: "",
    username: "",
    password: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    balance: 0,
  });
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSettingsClick = () => {
    if (isSettingsClicked === true) {
      setSettingsClicked(false);
      return;
    } else {
      setSettingsClicked(true);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleConfirmPopup = (e) => {
    e.preventDefault();

    const newPassword = profile.newPassword;
    const confirmNewPassword = profile.confirmNewPassword;
    const currentPassword = profile.currentPassword;

    // Check if the current password matches the stored password
    if (currentPassword !== profile.password) {
      setPasswordCorrect(false);
      return;
    } else {
      setPasswordCorrect(true);
    }

    // Check if the new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      setPasswordMatch(false);
      return;
    } else {
      setPasswordMatch(true);
      setPassword(confirmNewPassword);
    }

    if (passwordMatch && isPasswordCorrect) {
      setShowConfirmPopup(true);
    }
  };

  const handleConfirm = async () => {
    handleSubmit();
    setShowConfirmPopup(false);
  };

  const handleSubmit = async () => {
    axios
      .put(`http://localhost:5000/users/${user}`, {
        full_name: profile.full_name,
        age: profile.age,
        email: profile.email,
        username: profile.username,
        password: password,
        balance: profile.balance,
      })
      .then(() => {
        fetchUserData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete
  const handleDelete = () => {
    console.log("Account Deleted");
  };

  const closePopup = () => {
    setShowDeleteAccountPopup(false);
  };

  // Read
  const fetchUserData = () => {
    axios
      .get(`http://localhost:5000/users/${user}`)
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);
        console.log("profile", profile);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-screen w-screen flex flex-row">
        <div className="h-screen w-1/5 px-32 flex bg-blue-950 py-20">
          <VerticalNavBar
            isSettingsClicked={isSettingsClicked}
            handleSettingsClick={handleSettingsClick}
          />
        </div>

        <div className="bg-slate-200 h-full w-4/5 p-12 flex flex-col gap-y-6">
          <div className="h-24 w-full bg-yellow-500 px-10 flex items-center text-xl font-bold rounded-3xl">
            <div className="h-full w-1/2 flex items-center"> Edit Profile</div>

            <div className="h-full w-1/2 flex items-center justify-end">
              <img
                src="/images/notifications.png"
                alt="profile"
                className="h-12 w-12 rounded-full my-10 flex justify-end"
              />
            </div>
          </div>

          <div className=" h-[700px] w-full flex flex-col items-start justify-center px-60">
            <div className="w-full h-40 my-5 flex items-center justify-center ">
              <img
                src="/images/profile.png"
                alt="profile"
                className="h-40 w-40"
              />
            </div>
            <form className="w-full" onSubmit={handleConfirmPopup}>
              <div className="h-full w-full flex flex-col gap-y-4">
                <div className="w-full flex flex-row gap-x-6 ">
                  <div className="w-3/4">
                    <label className="text-xs font-thin">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      onChange={handleChange}
                      className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
                      value={profile.full_name}
                      // required
                    />
                  </div>
                  <div className="w-1/4">
                    <label className="text-xs font-thin">Age</label>
                    <input
                      type="number"
                      name="age"
                      onChange={handleChange}
                      className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
                      value={profile.age}
                      // required
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row gap-x-6 ">
                  <div className="w-2/4">
                    <label className="text-xs font-thin">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
                      value={profile.email}
                      // required
                    />
                  </div>
                  <div className="w-2/4">
                    <label className="text-xs font-thin">Username</label>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
                      value={profile.username}
                      // required
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-x-6 ">
                  <label className="text-xs font-thin py-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    onChange={handleChange}
                    className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
                    // required
                  />
                  {!isPasswordCorrect && (
                    <p className="text-red-500">Password incorrect!</p>
                  )}
                </div>
                <div className="w-full flex flex-row gap-x-6 ">
                  <div className="w-1/2">
                    <label className="text-xs font-thin py-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      onChange={handleChange}
                      className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
                      // required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="text-xs font-thin py-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      onChange={handleChange}
                      className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
                      // required
                    />
                    {!passwordMatch && (
                      <p className="text-red-500">Passwords do not match!</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-start mt-1 ">
                  <button
                    type="submit"
                    className="bg-blue-950 text-white h-12 w-1/3 rounded-lg shadow-lg mt-3"
                  >
                    Update Profile
                  </button>
                  <div
                    className="my-3 italic text-sm flex justify-end items-end mb-9 opacity-60 hover:opacity-100 hover:text-red-500"
                    onClick={() => setShowDeleteAccountPopup(true)}
                  >
                    I would like to delete my account.
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirm Update Pop Up */}
      {showConfirmPopup && (
        <ConfirmPopUp
          handleConfirm={handleConfirm}
          setShowConfirmPopup={setShowConfirmPopup}
        />
      )}

      {/* Delete Account Pop Up */}
      {showDeleteAccountPopup && (
        <DeleteAccountPopup
          handleDelete={handleDelete}
          closePopup={closePopup}
        />
      )}
    </div>
  );
}

export default EditProfile;
