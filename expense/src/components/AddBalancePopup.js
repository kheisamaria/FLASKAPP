// AddBalancePopup.js

import React, { useState } from "react";

const AddBalancePopup = ({ handleConfirm, closePopup }) => {
	const [balance, setBalance] = useState(0);

	const handleAmountChange = (event) => {
		setBalance(event.target.value);
	};

	return (
		<div>
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
				<div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
				<div className="bg-white p-8 w-[500px] h-[350px] rounded-lg z-10 flex flex-col first-letter justify-center items-center gap-y-2 px-12">
					<div className="flex flex-col text-center my-2">
						<div className="text-4xl font-extrabold">
							Add Balance
						</div>
						<div className="text-xs">
							Current Money from Savings: ₱ {balance}
						</div>
					</div>
					<div className="w-full flex flex-col my-5">
						<label>Amount to Add: </label>
						<input
							type="number"
							className="h-[50px] w-full border border-gray-300 rounded-lg px-2"
							value={balance}
							onChange={handleAmountChange}
						/>
					</div>
					<div className="flex flex-row w-full justify-center items-center my-3 gap-x-4">
						<button
							className="bg-green-600 text-white px-4 py-2 rounded-xl w-1/2 h-[45px] opacity-75 hover:opacity-100"
							onClick={() => handleConfirm(balance)}
						>
							Add
						</button>
						<button
							className="bg-red-600 text-white px-4 py-2 rounded-xl w-1/2 h-[45px] opacity-75 hover:opacity-100"
							onClick={closePopup}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddBalancePopup;
