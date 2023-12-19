// import "./App.css";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import ShowPopup from "../components/ShowPopupExpenses";
import ErrorPopup from "../components/ErrorPopup";
import Header from "../components/Header";
import DeletePopUp from "../components/DeletePopUp";

function Expenses() {
	const [showPopup, setShowPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [showUpdatePopup, setShowUpdatePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	const closePopup = () => {
		setExpenseData(formData);

		if (showErrorPopup === true) {
			setShowErrorPopup(false);
			return;
		}

		if (showDeletePopup === true) {
			setShowDeletePopup(false);
			return;
		}

		setShowPopup(false);
		setShowUpdatePopup(false);
	};

	const handlePopUpPaidChange = () => {
		// Paid status of pop up dialogs
		setExpenseData({
			...expenseData,
			paid: !expenseData.paid,
		});
	};

	const handlePaidStatus = () => {
		// Paid status directly of the table
		setExpenseData({
			...expenseData,
			paid: !expenseData.paid,
		});

		console.log("Paid status changed.");
	};

	// Create savings data
	const formData = {
		amount: 0,
		description: "",
		frequency: "",
		paid: false,
	};

	const [expenseData, setExpenseData] = useState(formData);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setExpenseData({ ...expenseData, [name]: value });
	};

	const handleSave = () => {
		if (expenseData.description === "" || expenseData.category === "") {
			// Show the error pop-up
			setShowErrorPopup(true);
			return;
		}

		const newData = {
			...expenseData,
		};

		console.log("Saving data to the database:", newData);

		setExpenseData(formData);
		closePopup();
	};

	const handleDelete = () => {
		console.log("Expense deleted.");
		closePopup();
	};

	return (
		<div className="bg-blue-950 h-screen w-screen">
			<div className="w-full h-full">
				<NavBar />
				<Header
					title="Expenses Tracker"
					subtitle="The List"
					description="Effortlessly manage your monthly bills with this— track
					amounts, describe expenses, set frequencies, and monitor payment
					status. Take control now!"
				/>

				<div className="px-56 mt-10">
					<div className="h-16 w-full mt-5 flex flex-row justify-between items-end">
						<div className="h-full w-fit flex flex-col items-start justify-end text-yellow-500 font-bold text-3xl">
							<div className="text-xs font-normal">
								Unpaid Expenses
							</div>
							<div>
								<span>12</span> Expenses to Pay
							</div>
						</div>

						<div className="h-full flex items-end">
							<button
								className="bg-yellow-500 h-10 w-40 rounded-3xl border-1 border-black font-bold hover:bg-white"
								onClick={() => setShowPopup(true)}
							>
								Add Expense
							</button>
						</div>
					</div>

					<div className="mt-2 h-[500px] overflow-auto">
						<table className="mx-auto my-auto table-container">
							<thead className="h-10 table-header">
								<tr>
									<th style={{ width: "5%" }}>#</th>
									<th style={{ width: "5%" }}>Paid</th>
									<th style={{ width: "20%" }}>
										Amount to Pay
									</th>
									<th style={{ width: "25%" }}>
										Description
									</th>
									<th style={{ width: "10%" }}>Frequency</th>

									<th style={{ width: "5%" }}>Edit</th>
									<th style={{ width: "5%" }}>Delete</th>
								</tr>
							</thead>
							<tbody className="h-10 table-body">
								<tr>
									<td>
										<div className="flex items-center justify-center">
											1
										</div>
									</td>
									<td>
										<div className="flex items-center justify-center">
											<input
												type="checkbox"
												className="w-5 h-5 bg-yellow-500"
												onChange={handlePaidStatus}
												checked={expenseData.paid}
											/>
										</div>
									</td>
									<td>Php 100.00</td>
									<td>Groceries</td>
									<td>Monthly</td>

									<td>
										<div className="flex items-center justify-center">
											<img
												src="/images/edit.png"
												alt="edit"
												className="w-7 h-7 grayscale hover:grayscale-0"
												onClick={() =>
													setShowUpdatePopup(true)
												}
											/>
										</div>
									</td>
									<td>
										<div className="flex items-center justify-center">
											<img
												src="/images/delete.png"
												alt="delete"
												className="w-7 h-7 grayscale hover:grayscale-0"
												onClick={() =>
													setShowDeletePopup(true)
												}
											/>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<Footer />
			</div>

			{/* Pop-up */}
			{showPopup && (
				<ShowPopup
					title="Add Expense"
					expenseData={expenseData}
					handleChange={handleChange}
					closePopup={closePopup}
					handlePopUpPaidChange={handlePopUpPaidChange}
					handleSave={handleSave}
				/>
			)}

			{/* Update Pop Up */}
			{showUpdatePopup && (
				<ShowPopup
					title="Update Expense"
					expenseData={expenseData}
					handleChange={handleChange}
					closePopup={closePopup}
					handlePopUpPaidChange={handlePopUpPaidChange}
					handleSave={handleSave}
				/>
			)}

			{/* Delete Pop Up */}
			{showDeletePopup && (
				<DeletePopUp
					title="expense"
					handleDelete={handleDelete}
					closePopup={() => setShowDeletePopup(false)}
				/>
			)}

			{/* Error Pop Up */}
			{showErrorPopup && (
				<ErrorPopup setShowErrorPopup={setShowErrorPopup} />
			)}
		</div>
	);
}

export default Expenses;
