// import "./App.css";

import { Link } from "react-router-dom";

function Registration() {
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

					<div className="flex flex-col gap-y-4 mt-6">
						<div className="w-full flex flex-row gap-x-6 ">
							<div className="w-3/4">
								<label className="text-xs font-thin">
									Full Name
								</label>
								<input
									type="text"
									className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
								/>
							</div>
							<div className="w-1/4">
								<label className="text-xs font-thin">Age</label>
								<input
									type="number"
									className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
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
									className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
								/>
							</div>
							<div className="w-2/4">
								<label className="text-xs font-thin">
									Username
								</label>
								<input
									type="text"
									className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
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
									className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
								/>
							</div>
							<div className="w-2/4">
								<label className="text-xs font-thin">
									Confirm Password
								</label>
								<input
									type="password"
									className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
								/>
							</div>
						</div>
						<div className="w-full flex flex-row ">
							<div className="w-full">
								<label className="text-xs font-thin">
									Starting Balance
								</label>
								<input
									type="email"
									className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-col items-end justify-end mt-14 ">
						<button className="bg-blue-950 text-white h-12 w-2/5 rounded-lg shadow-lg">
							Register
						</button>

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
