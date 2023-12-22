import React, { useEffect, useState } from "react";
import ConfirmPopup from "./ConfirmPopup";

const UpdatePopupSavings = ({
	savingsData,
	closePopup,
	handleUpdateSavings,
}) => {
	// Create a new state for duplicated savingsData
	const [updatedSavingsData, setUpdatedSavingsData] = useState({
		amount: 0,
		category: "",
		description: "",
		...savingsData,
	});

	// Update the state when savingsData changes
	useEffect(() => {
		setUpdatedSavingsData({ ...savingsData });
	}, [savingsData]);

	const handleChange = (e) => {
		// Handle changes in the duplicated savingsData
		const { name, value } = e.target;
		setUpdatedSavingsData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const [showConfirmPopup, setShowConfirmPopup] = useState(false);

	const handleConfirm = () => {
		handleUpdateSavings(updatedSavingsData);
		setShowConfirmPopup(false);
	};

	return (
		<div className="h-screen w-screen">
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
				<div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
				<div className="bg-white p-8 w-[800px] h-[500px] rounded-lg z-10">
					<div className="flex justify-center font-bold text-2xl mt-2">
						Update Savings
					</div>
					<div className="mt-6">
						<div className="flex flex-row w-full gap-x-6">
							<div className="w-1/2">
								<label className="block text-md mb-1">
									Amount
								</label>
								<input
									type="number"
									className="h-[50px] w-full border border-gray-300 p-2 mb-4"
									name="amount"
									value={updatedSavingsData.amount}
									onChange={handleChange}
								/>
							</div>
							<div className="w-1/2">
								<label className="block text-md mb-1">
									Category
								</label>
								<select
									className="h-[50px] w-full border border-gray-300 p-2 mb-4"
									name="category"
									value={updatedSavingsData.category}
									onChange={handleChange}
								>
									<option value="">Please Select...</option>
									<option value="Allowance">Allowance</option>
									<option value="Salary">Salary</option>
									<option value="Checking">Checking</option>
									<option value="Cash">Cash</option>
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
								value={updatedSavingsData.description}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex justify-center w-full gap-x-1 mt-2">
						<button
							className="bg-blue-950 text-white px-4 py-2 rounded-xl w-1/3 opacity-75 hover:opacity-100"
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

export default UpdatePopupSavings;
