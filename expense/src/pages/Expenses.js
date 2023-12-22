// import "./App.css";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import React, { useState, useEffect, useContext } from "react";
import ShowPopup from "../components/ShowPopupExpenses";
import ErrorPopup from "../components/ErrorPopup";
import Header from "../components/Header";
import DeletePopUp from "../components/DeletePopUp";
import axios from "axios";
import UserContext from "../UserContext";
import UpdatePopupExpenses from "../components/UpdatePopupExpenses";

// naay error sa pagcount sa unpaid expenses
function Expenses() {
	const { user } = useContext(UserContext);
	const [showPopup, setShowPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [showUpdatePopup, setShowUpdatePopup] = useState(false);
	const [updateData, setUpdateData] = useState({});
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [expenses, setExpenses] = useState([]);
	const [toBeDeleted, setToBeDeleted] = useState({});
	const [unpaidExpensesCount, setUnpaidExpensesCount] = useState();

	useEffect(() => {
		fetchExpenses();
	}, [user]);

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

	// Create expenses data
	const formData = {
		amount: 0,
		description: "",
		frequency: "",
		paid: false,
		user_id: user,
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
		handleCreate();
		closePopup();
	};

	// Read expenses data
	const fetchExpenses = () => {
		axios
			.get(`http://localhost:5000/expenses/user/${user}`)
			.then((response) => {
				setExpenses(response.data);
				const unpaidCount = expenses.filter(
					(expense) => expense.paid === false
				).length;
				setUnpaidExpensesCount(unpaidCount);
				console.log(unpaidExpensesCount);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// Create expenses data
	const handleCreate = () => {
		axios
			.post("http://localhost:5000/expenses", expenseData)
			.then(() => {
				fetchExpenses();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// Update expenses data
	const handleUpdate = (expense) => {
		setUpdateData({
			amount: expense.amount,
			description: expense.description,
			frequency: expense.frequency,
			paid: expense.paid,
			user_id: expense.user_id,
			expenses_id: expense.expenses_id,
		});
		setShowUpdatePopup(true);
	};

	const handleUpdateExpenses = (updatedExpenesesData) => {
		// axios
		// 	.put(
		// 		`http://localhost:5000/savings/${updatedSavingsData.savings_id}`,
		// 		{
		// 			...updatedSavingsData,
		// 		}
		// 	)
		// 	.then(() => {
		// 		alert("Savings updated.");
		// 		fetchSavings();
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});

		console.log("Updated expense:", updatedExpenesesData);
		closePopup();
	};

	// Delete expenses data
	const deleteHandling = (expense) => {
		setToBeDeleted(expense);
		setShowDeletePopup(true);
	};

	const handleDelete = (expense) => {
		axios
			.delete(`http://localhost:5000/expenses/${expense.expense_id}`)
			.then(() => {
				fetchExpenses();
			})
			.catch((error) => {
				console.log(error);
			});

		console.log("Deleted expense:", expense);
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
							{unpaidExpensesCount > 0 ? (
								<>
									<div className="text-xs font-normal">
										Unpaid Expenses
									</div>
									<div>
										<span>{unpaidExpensesCount}</span>{" "}
										Expenses to Pay
									</div>
								</>
							) : (
								<div>No Unpaid Expenses</div>
							)}
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
								{expenses.map((expense, index) => (
									<tr key={expense.expense_id}>
										<td>
											<div className="flex items-center justify-center">
												{index + 1}
											</div>
										</td>
										<td>
											<div className="flex items-center justify-center">
												<input
													type="checkbox"
													className="w-5 h-5 bg-yellow-500"
													onChange={handlePaidStatus}
													checked={expense.paid}
													readOnly
												/>
											</div>
										</td>
										<td>
											Php{" "}
											{parseFloat(expense.amount).toFixed(
												2
											)}
										</td>
										<td>{expense.description}</td>
										<td>{expense.frequency}</td>
										<td>
											<div className="flex items-center justify-center">
												<img
													src="/images/edit.png"
													alt="edit"
													className="w-7 h-7 grayscale hover:grayscale-0"
													onClick={() =>
														handleUpdate(expense)
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
														deleteHandling(expense)
													}
												/>
											</div>
										</td>
									</tr>
								))}
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
				<UpdatePopupExpenses
					expenseData={updateData}
					closePopup={closePopup}
					handleUpdateExpenses={handleUpdateExpenses}
					handlePopUpPaidChange={handlePopUpPaidChange}
				/>
			)}

			{/* Delete Pop Up */}
			{showDeletePopup && (
				<DeletePopUp
					title="expense"
					handleDelete={handleDelete}
					closePopup={() => setShowDeletePopup(false)}
					row={toBeDeleted}
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
