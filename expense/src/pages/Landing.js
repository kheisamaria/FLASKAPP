import React from "react";
// import "./App.css";

function Landing() {
	return (
		<div className="bg-blue-950 h-screen w-screen">
			{/* Nav Bar */}
			<div className=" h-24 w-screen px-32 flex">
				<div className=" h-full w-1/12 text-4xl font-bold text-yellow-400 flex items-center">
					SpendR
				</div>
				<div className="h-full w-full font-semibold flex items-center justify-end text-yellow-400 ">
					<button className=" h-12 w-28">Sign in</button>
				</div>
			</div>

			{/* Main Content */}
			<div className="h-[800px] w-screen flex flex-row">
				<div className=" w-3/5 h-full px-32 flex flex-col gap-y-2 text-white justify-center">
					<div className="h-fit text-6xl font-extrabold">
						8 out of 10 people struggle to track their money.
					</div>
					<div className="h-fit w-4/5 text-5xl font-bold text-yellow-500">
						Let's change that.
					</div>

					<div className="h-fit w-3/5 text-xl mt-10">
						Spendr helps you organize your spendings and keep you
						responsible to your own finances.
					</div>

					<button className="bg-white text-blue-950 h-12 w-60 rounded-lg my-2 shadow-lg">
						Register Now!
					</button>
				</div>

				<div className=" w-2/5 h-full pr-32 pb-20 flex items-center justify-center ">
					<img src="/money.png" alt="money" className="w-3/4 h-fit" />
				</div>
			</div>
		</div>
	);
}

export default Landing;
