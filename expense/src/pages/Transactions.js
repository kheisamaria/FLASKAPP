import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import ShowPopup from "../components/ShowPopupTransactions";
import ErrorPopup from "../components/ErrorPopup";
import DeletePopUp from "../components/DeletePopUp";
import Header from "../components/Header";

function Transactions() {
	const [showPopup, setShowPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [showUpdatePopup, setShowUpdatePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	const closePopup = () => {
		setTransactionData(formData);

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

	const formData = {
		amount: 0,
		description: "",
		category: "",
		date: "",
		time: "",
	};

	const [transactionData, setTransactionData] = useState(formData);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setTransactionData({ ...transactionData, [name]: value });
	};

	const handleSave = () => {
		if (
			transactionData.description === "" ||
			transactionData.category === ""
		) {
			setShowErrorPopup(true);
			return;
		}

		const currentDate = new Date().toLocaleDateString();
		const currentTime = new Date().toLocaleTimeString();

		const newData = {
			...transactionData,
			date: currentDate,
			time: currentTime,
		};

		console.log("Saving data to the database:", newData);

		setTransactionData(formData);
		closePopup();
	};

	// Read Transaction data

	// Update Transaction data

	// Delete Transaction data
	const handleDelete = () => {
		console.log("Transaction deleted.");
		closePopup();
	};

	return (
		<div className="bg-blue-950 h-screen w-screen">
			<div className="w-full h-full">
				<NavBar />
				<Header
					title="Transactions"
					subtitle="Money Spent"
					description="Record financial exchanges effortlessly, tracking amounts, dates, and involved parties. 
					Gain clarity on your financial history for better insights and organization."
				/>
				<div className="px-32 mt-10">
					<div className="h-16 w-full mt-5 flex flex-row justify-between items-end">
						{/* Dynamic Total Transaction */}
						<div className="h-full w-fit flex flex-col items-start justify-end text-yellow-500 font-bold text-3xl">
							<div className="text-xs font-normal">
								Money Spent
							</div>
							<div>Php 80,000.00</div>
						</div>

						{/* Add Transaction */}
						<div className="h-full flex items-end">
							<button
								className="bg-yellow-500 h-10 w-44 rounded-3xl border-1 border-black font-bold hover:bg-white"
								onClick={() => setShowPopup(true)}
							>
								Add Transaction
							</button>
						</div>
					</div>

					<div className="mt-2 h-[500px] overflow-auto">
						<table className="mx-auto my-auto table-container">
							<thead className="h-10 table-header">
								<tr>
									<th style={{ width: "5%" }}>#</th>
									<th style={{ width: "20%" }}>Amount</th>
									<th style={{ width: "25%" }}>
										Description
									</th>
									<th style={{ width: "10%" }}>Date</th>
									<th style={{ width: "10%" }}>Time</th>
									<th style={{ width: "20%" }}>
										Payment Method
									</th>
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
									<td>100.00</td>
									<td>Groceries</td>
									<td>2023-12-15</td>
									<td>12:30 PM</td>
									<td>Food</td>
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

			{/* Create Pop-up */}
			{showPopup && (
				<ShowPopup
					title="Add Transaction"
					transactionData={transactionData}
					handleChange={handleChange}
					closePopup={closePopup}
					handleSave={handleSave}
				/>
			)}

			{/* Update Pop Up */}
			{showUpdatePopup && (
				<ShowPopup
					title="Update Transaction"
					transactionData={transactionData}
					handleChange={handleChange}
					closePopup={closePopup}
					handleSave={handleSave}
				/>
			)}

			{/* Delete Pop Up */}
			{showDeletePopup && (
				<DeletePopUp
					title="transaction"
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

export default Transactions;
