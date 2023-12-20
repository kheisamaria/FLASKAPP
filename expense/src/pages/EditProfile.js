// note ma error sya basta dili unique ang email and username butangan lang error per anue para klaro pero laters
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import DeleteAccountPopup from "../components/DeleteAccountPopup";
import ConfirmPopUp from "../components/ConfirmPopup";
import VerticalNavBar from "../components/VerticalNavBar";

function EditProfile() {
	const [isSettingsClicked, setSettingsClicked] = useState(false);
	const [showConfirmPopup, setShowConfirmPopup] = useState(false);
	const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

	const handleSettingsClick = () => {
		if (isSettingsClicked === true) {
			setSettingsClicked(false);
			return;
		} else {
			setSettingsClicked(true);
		}
	};

	// Update
	const [user, setUser] = useState({
		full_name: "",
		age: 0,
		email: "",
		username: "",
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleConfirmPopup = (e) => {
		e.preventDefault();
		setShowConfirmPopup(true);
	};

	const handleConfirm = async () => {
		handleSubmit();
		setShowConfirmPopup(false);
	};

	const handleSubmit = async () => {
		console.log("Profile Updated!");
	};

	// Delete
	const handleDelete = () => {
		console.log("Account Deleted");
	};

	const closePopup = () => {
		setShowDeleteAccountPopup(false);
	};

	return (
		<div className="h-screen w-screen">
			<div className="h-screen w-screen flex flex-row">
				<div className="h-full w-1/5 px-32 flex bg-blue-950 py-20">
					<VerticalNavBar
						isSettingsClicked={isSettingsClicked}
						handleSettingsClick={handleSettingsClick}
					/>
				</div>

				<div className="bg-slate-200 h-full w-4/5 p-12 flex flex-col gap-y-6">
					<div className="h-24 w-full bg-yellow-500 px-10 flex items-center text-xl font-bold rounded-3xl">
						<div className="h-full w-1/2 flex items-center">
							{" "}
							Edit Profile
						</div>

						<div className="h-full w-1/2 flex items-center justify-end">
							<img
								src="/images/notifications.png"
								alt="profile"
								className="h-12 w-12 rounded-full my-10 flex justify-end"
							/>
						</div>
					</div>

					<div className=" h-fit w-full flex flex-col items-start justify-center px-60">
						<div className="w-full h-44 my-5 flex items-center justify-center ">
							<img
								src="/images/profile.png"
								alt="profile"
								className="h-44 w-44"
							/>
						</div>
						<form className="w-full" onSubmit={handleConfirmPopup}>
							<div className="h-full w-full flex flex-col gap-y-4">
								<div className="w-full flex flex-row gap-x-6 ">
									<div className="w-3/4">
										<label className="text-xs font-thin">
											Full Name
										</label>
										<input
											type="text"
											name="full_name"
											onChange={handleChange}
											className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
											// required
										/>
									</div>
									<div className="w-1/4">
										<label className="text-xs font-thin">
											Age
										</label>
										<input
											type="number"
											name="age"
											onChange={handleChange}
											className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
											// required
										/>
									</div>
								</div>
								<div className="w-full flex flex-row gap-x-6 ">
									<div className="w-2/4">
										<label className="text-xs font-thin">
											Email
										</label>
										<input
											type="email"
											name="email"
											onChange={handleChange}
											className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
											// required
										/>
									</div>
									<div className="w-2/4">
										<label className="text-xs font-thin">
											Username
										</label>
										<input
											type="text"
											name="username"
											onChange={handleChange}
											className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
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
										name="password"
										onChange={handleChange}
										className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
										// required
									/>
								</div>
								<div className="w-full flex flex-row gap-x-6 ">
									<div className="w-1/2">
										<label className="text-xs font-thin py-1">
											New Password
										</label>
										<input
											type="password"
											name="password"
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
											name="password"
											onChange={handleChange}
											className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
											// required
										/>
									</div>
								</div>
								<div className="flex flex-col items-end justify-start mt-2 ">
									<button
										type="submit"
										className="bg-blue-950 text-white h-12 w-1/3 rounded-lg shadow-lg mt-3"
									>
										Register
									</button>
									<div
										className="my-3 italic text-sm flex justify-end items-end mb-9 opacity-60 hover:opacity-100 hover:text-red-500"
										onClick={() =>
											setShowDeleteAccountPopup(true)
										}
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
