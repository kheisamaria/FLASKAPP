import React, { useEffect, useState } from "react";
import ConfirmPopup from "./ConfirmPopup";

const ShowPopup = ({ expenseData, closePopup, handleUpdateExpenses }) => {
	// Create a new state for duplicated savingsData
	const [updatedExpensesData, setUpdatedExpensesData] = useState({
		amount: 0,
		description: "",
		frequency: "",
		paid: false,
		...expenseData,
	});

	// Update the state when savingsData changes
	useEffect(() => {
		setUpdatedExpensesData({ ...expenseData });
	}, [expenseData]);

	const handleChange = (e) => {
		// Handle changes in the duplicated savingsData
		const { name, value } = e.target;
		setUpdatedExpensesData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (e) => {
		const { checked } = e.target;
		setUpdatedExpensesData((prevData) => ({
			...prevData,
			paid: checked,
		}));
	};

	const [showConfirmPopup, setShowConfirmPopup] = useState(false);

	const handleConfirm = () => {
		handleUpdateExpenses(updatedExpensesData);
		setShowConfirmPopup(false);
	};

	return (
		<div className="h-screen w-screen">
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
				<div className="absolute w-full h-full bg-gray-900 opacity-50 flex items-center"></div>
				<div className="bg-white p-8 w-[800px] h-[530px] rounded-lg z-10">
					<div className="flex justify-center font-bold text-2xl mt-2">
						Update Expense
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
									value={updatedExpensesData.amount}
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
									value={updatedExpensesData.frequency}
									onChange={handleChange}
								>
									<option value="">Please Select...</option>
									<option value="Daily">Daily</option>
									<option value="Weekly">Weekly</option>
									<option value="Monthly">Monthly</option>
									<option value="Quarterly">Quarterly</option>
									<option value="Yearly">Yearly</option>
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
								value={updatedExpensesData.description}
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center">
							<label className="flex items-center">
								Mark as paid?{" "}
							</label>
							<input
								type="checkbox"
								className="h-4 w-4 mx-2"
								checked={updatedExpensesData.paid}
								onChange={handleCheckboxChange}
							/>
						</div>
					</div>
					<div className="flex justify-center w-full gap-x-1 mt-6">
						<button
							className=" bg-blue-950 text-white px-4 py-2 rounded-xl w-1/3 opacity-75 hover:opacity-100"
							onClick={closePopup}
						>
							Cancel
						</button>
						<button
							className="bg-yellow-500 text-white px-4 py-2 ml-4 rounded-xl w-1/3 opacity-75 hover:opacity-100"
							onClick={() => setShowConfirmPopup(true)}
						>
							Save
						</button>
					</div>
				</div>
			</div>

			{/* Confirm Pop Up */}
			{showConfirmPopup && (
				<ConfirmPopup
					handleConfirm={handleConfirm}
					setShowConfirmPopup={setShowConfirmPopup}
				/>
			)}
		</div>
	);
};

export default ShowPopup;
