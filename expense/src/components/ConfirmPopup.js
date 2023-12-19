import React from "react";

const ConfirmPopUp = ({ handleConfirm, setShowConfirmPopup }) => {
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
				<div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
				<div className="bg-white p-4 w-[380px] h-[300px] rounded-lg z-10 flex flex-col first-letter justify-center items-center gap-y-2">
					<img
						src="/images/check-mark.png"
						alt="error"
						className="w-28 h-28 flex items-center justify-center"
						// onClick={}
					/>
					<div className="my-3">Confirm Changes?</div>
					<div className="flex flex-row gap-x-3 w-full items-center justify-center">
						<button
							className="bg-green-500 text-white px-4 py-2 rounded-xl w-1/3 h-[45px] opacity-75 hover:opacity-100"
							onClick={() => handleConfirm()}
						>
							Confirm
						</button>
						<button
							className="bg-red-500 text-white px-4 py-2 rounded-xl w-1/3 h-[45px] opacity-75 hover:opacity-100"
							onClick={() => setShowConfirmPopup(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmPopUp;
