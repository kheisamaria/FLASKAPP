// note ma error sya basta dili unique ang email and username butangan lang error per anue para klaro pero laters
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Registration() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		full_name: "",
		email: "",
		username: "",
		password: "",
		balance: 0.0,
		age: 0,
	});
	const [passwordMatch, setPasswordMatch] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (e.target.password.value !== e.target.confirmPassword.value) {
			setPasswordMatch(false);
			return;
		} else {
			setPasswordMatch(true);
			setUser({
				...user,
				password: e.target.password.value,
				balance: parseFloat(e.target.balance.value),
			});
		}

		try {
			const result = await axios.post(
				"http://localhost:5000/users",
				user
			);
			console.log("Created", result);
			navigate("/login");
		} catch (error) {
			console.log("error", error);
		}

		alert("Registration Successful!");
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className="bg-blue-950 h-screen w-screen flex">
			<div className="bg-yellow-500 h-full w-2/5 px-12 flex flex-col items-start text-white justify-end gap-y-3 py-52">
				<div className="text-5xl font-bold">
					SpendR encourages you to be the best version of yourself.
				</div>
				<div className="mt-4">
					<span className="text-2xl">
						It all starts with a simple step.
					</span>{" "}
					<br />
					<span className="text-md">Sign up for an account now!</span>
				</div>
			</div>

			<div className="h-full w-3/5 px-12 flex flex-col items-center text-white justify-center gap-y-3">
				<div className="h-[660px] w-[800px] border border-indigo-950 bg-white shadow-2xl rounded-lg flex flex-col text-blue-950 px-8 py-6">
					<div className="flex flex-col mt-3">
						<div className="font-bold text-3xl">
							Be part of the SpendR community!
						</div>
						<div className="text-lg">
							We can't wait to have you join the fun.
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-y-4 mt-6">
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
										required
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
										required
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
										required
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
										required
									/>
								</div>
							</div>
							<div className="w-full flex flex-row gap-x-6 ">
								<div className="w-2/4">
									<label className="text-xs font-thin">
										Password
									</label>
									<input
										type="password"
										name="password"
										onChange={handleChange}
										className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
										required
									/>
								</div>
								<div className="w-2/4">
									<label className="text-xs font-thin">
										Confirm Password
									</label>
									<input
										type="password"
										name="confirmPassword"
										onChange={handleChange}
										className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
										required
									/>
									{!passwordMatch && (
										<p className="text-red-500">
											Passwords do not match!
										</p>
									)}
								</div>
							</div>
							<div className="w-full flex flex-row ">
								<div className="w-full">
									<label className="text-xs font-thin">
										Starting Balance
									</label>
									<input
										type="number"
										name="balance"
										onChange={handleChange}
										className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
										required
									/>
								</div>
							</div>
						</div>

						<div className="flex flex-col items-end justify-end mt-14 ">
							<button
								type="submit"
								className="bg-blue-950 text-white h-12 w-2/5 rounded-lg shadow-lg"
							>
								Register
							</button>
						</div>
					</form>

					<div className="flex flex-col items-end justify-end mt-14 ">
						<div className="flex justify-center mt-2">
							<Link to="/login">
								<label className="text-xs font-thin italic hover:text-yellow-500">
									Have an account? Login!
								</label>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Registration;
