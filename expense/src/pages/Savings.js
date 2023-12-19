import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import ShowPopup from "../components/ShowPopupSavings";
import ErrorPopup from "../components/ErrorPopup";
import DeletePopUp from "../components/DeletePopUp";
import Header from "../components/Header";

function Savings() {
	const [showPopup, setShowPopup] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [showUpdatePopup, setShowUpdatePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	const closePopup = () => {
		setSavingsData(formData);

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

	const [savingsData, setSavingsData] = useState(formData);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setSavingsData({ ...savingsData, [name]: value });
	};

	const handleSave = () => {
		if (savingsData.description === "" || savingsData.category === "") {
			setShowErrorPopup(true);
			return;
		}

		const currentDate = new Date().toLocaleDateString();
		const currentTime = new Date().toLocaleTimeString();

		const newData = {
			...savingsData,
			date: currentDate,
			time: currentTime,
		};

		console.log("Saving data to the database:", newData);

		setSavingsData(formData);
		closePopup();
	};

	// Read savings data

	// Update savings data

	// Delete savings data
	const handleDelete = () => {
		console.log("Savings deleted.");
		closePopup();
	};

	return (
		<div className="bg-blue-950 h-screen w-screen">
			<div className="w-full h-full">
				<NavBar />
				<Header
					title="Savings Tracker"
					subtitle="Money Earned"
					description="Enhance your financial insights by seamlessly adding savings,
				consolidating a real-time overview of total funds,
				encompassing both cash and assets."
				/>
				<div className="px-32 mt-10">
					<div className="h-16 w-full mt-5 flex flex-row justify-between items-end">
						{/* Dynamic Total Savings */}
						<div className="h-full w-fit flex flex-col items-start justify-end text-yellow-500 font-bold text-3xl">
							<div className="text-xs font-normal">
								Money Earned
							</div>
							<div>Php 80,000.00</div>
						</div>

						{/* Add Savings */}
						<div className="h-full flex items-end">
							<button
								className="bg-yellow-500 h-10 w-40 rounded-3xl border-1 border-black font-bold hover:bg-white"
								onClick={() => setShowPopup(true)}
							>
								Add Savings
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
									<th style={{ width: "20%" }}>Category</th>
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

			{/* Pop-up */}
			{showPopup && (
				<ShowPopup
					title="Add Savings"
					savingsData={savingsData}
					handleChange={handleChange}
					closePopup={closePopup}
					handleSave={handleSave}
				/>
			)}

			{/* Update Pop Up */}
			{showUpdatePopup && (
				<ShowPopup
					title="Update Savings"
					savingsData={savingsData}
					handleChange={handleChange}
					closePopup={closePopup}
					handleSave={handleSave}
				/>
			)}

			{/* Delete Pop Up */}
			{showDeletePopup && (
				<DeletePopUp
					title="savings"
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

export default Savings;
