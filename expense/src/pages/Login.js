// import "./App.css";

import { Link } from "react-router-dom";

function Login() {
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

				<div className="flex flex-col gap-y-6 mt-8">
					<div>
						<label className="text-sm font-thin">
							Username/Email
						</label>
						<input
							type="text"
							className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
						/>
					</div>
					<div>
						<label className="text-sm font-thin">Password</label>
						<input
							type="text"
							className="h-14 w-full border border-blue-100 outline-none rounded-lg px-2 shadow-md"
						/>
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
					<Link to="/home" className="w-full flex justify-center">
						<button className="bg-blue-950 text-white h-12 w-3/5 rounded-lg shadow-lg">
							Login
						</button>
					</Link>
				</div>

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
