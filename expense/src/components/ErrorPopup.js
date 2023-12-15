import React from "react";

const ErrorPopup = ({ setShowErrorPopup }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
			<div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
			<div className="bg-white p-8 w-[400px] h-[350px] rounded-lg z-10 flex flex-col first-letter justify-center items-center gap-y-2">
				<img
					src="/images/error.png"
					alt="error"
					className="w-28 h-28 mt-3 flex items-center justify-center my-3"
					// onClick={}
				/>
				<div>Please don't leave the fields blank!</div>
				<button
					className="bg-yellow-500 text-white px-4 py-2 rounded-xl w-2/3 h-[45px] mt-10 opacity-75 hover:opacity-100"
					onClick={() => setShowErrorPopup(false)}
				>
					Okay
				</button>
			</div>
		</div>
	);
};

export default ErrorPopup;
