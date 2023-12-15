import React from "react";

const ShowPopup = ({ expenseData, handleChange, closePopup, handleSave }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
			<div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
			<div className="bg-white p-8 w-[800px] h-[500px] rounded-lg z-10">
				<div className="flex justify-center font-bold text-2xl mt-2">
					Add Expense
				</div>
				<div className="mt-6">
					<div className="flex flex-row w-full gap-x-6">
						<div className="w-1/2">
							<label className="block text-md mb-1">
								Enter Amount
							</label>
							<input
								type="number"
								className="h-[50px] w-full border border-gray-300 p-2 mb-4"
								name="amount"
								value={expenseData.amount}
								onChange={handleChange}
							/>
						</div>
						<div className="w-1/2">
							<label className="block text-md mb-1">
								Frequency
							</label>
							<select
								className="h-[50px] w-full border border-gray-300 p-2 mb-4"
								name="frequency"
								value={expenseData.frequency}
								onChange={handleChange}
							>
								<option value="">Please Select...</option>
								<option value="savings">Daily</option>
								<option value="checking">Weekly</option>
								<option value="cash">Monthly</option>
								<option value="cash">Quarterly</option>
								<option value="cash">Yearly</option>
							</select>
						</div>
					</div>
					<div>
						<label className="block text-md mb-1">
							Description
						</label>
						<textarea
							type="text"
							className="h-[150px] w-full border border-gray-300 p-2 mb-4"
							name="description"
							value={expenseData.description}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex justify-center w-full gap-x-1 mt-2">
					<button
						className=" bg-blue-950 text-white px-4 py-2 rounded-xl w-1/3 opacity-75 hover:opacity-100"
						onClick={closePopup}
					>
						Cancel
					</button>
					<button
						className="bg-yellow-500 text-white px-4 py-2 ml-4 rounded-xl w-1/3 opacity-75 hover:opacity-100"
						onClick={handleSave}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShowPopup;
