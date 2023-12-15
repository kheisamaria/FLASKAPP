// import "./App.css";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";

function Savings() {
	const [showPopup, setShowPopup] = useState(false);

	const openPopup = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	// Create savings data
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

	return (
		<div className="bg-blue-950 h-screen w-screen">
			<div className="w-full h-full">
				<NavBar />
				<div className="flex flex-col bg-yellow-500 h-80 w-full text-blue-950 gap-y-4 px-32 justify-center drop-shadow-2xl">
					<div className="">
						<div className="font-semibold text-lg">
							Total Savings
						</div>
						<div className="font-semibold text-8xl">
							₱ 300,000.00
						</div>
					</div>
					<div className="text-lg">
						Current Balance: Php 234,000.00
					</div>
				</div>
				<div className="px-32">
					<div className=" h-8 w-full mt-5 flex justify-end">
						<button
							className="bg-yellow-500 h-full w-8 rounded-3xl"
							onClick={openPopup}
						>
							+
						</button>
					</div>
					<div className="">
						<table className="bg-transparent mx-auto my-auto border-yellow-500 h-[500px] w-full mt-2 border text-yellow-500 overflow-y-auto">
							<thead className="h-10">
								<tr>
									<th
										className="border border-yellow-500"
										style={{ width: "5%" }}
									>
										#
									</th>
									<th
										className="border border-yellow-500" //20
										style={{ width: "20%" }}
									>
										Amount
									</th>
									<th
										className="border border-yellow-500" //35
										style={{ width: "25%" }}
									>
										Description
									</th>
									<th
										className="border border-yellow-500" //45
										style={{ width: "10%" }}
									>
										Date
									</th>
									<th
										className="border border-yellow-500" //55
										style={{ width: "10%" }}
									>
										Time
									</th>
									<th
										className="border border-yellow-500" //70
										style={{ width: "20%" }}
									>
										Category
									</th>
									<th
										className="border border-yellow-500" //80
										style={{ width: "5%" }}
									>
										Edit
									</th>
									<th
										className="border border-yellow-500" //90
										style={{ width: "5%" }}
									>
										Delete
									</th>
								</tr>
							</thead>
							<tbody className="h-10">
								{/* {savingsData.map((entry) => (
									<tr key={entry.savings_id}>
										<td>{entry.savings_id}</td>
										<td>{entry.user_id}</td>
										<td>{entry.amount}</td>
										<td>{entry.description}</td>
										<td>{entry.date}</td>
										<td>{entry.time}</td>
										<td>{entry.category}</td>
									</tr>
								))} */}
							</tbody>
						</table>
					</div>
				</div>
				<Footer />
			</div>

			{/* Pop-up */}
			{showPopup && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
					<div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
					<div className="bg-white p-8 w-[800px] h-[500px] rounded-lg z-10">
						<div className="flex justify-center font-bold text-2xl mt-2">
							Add Savings
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
										value={savingsData.amount}
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
										value={savingsData.category}
										onChange={handleChange}
									>
										<option>Please Select...</option>
										<option value="savings">
											Allowance
										</option>
										<option value="checking">Salary</option>
										<option value="cash">Checking</option>
										<option value="cash">Cash</option>
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
									value={savingsData.description}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="flex justify-center w-full gap-x-1 mt-2">
							<button
								className=" bg-blue-950 text-white px-4 py-2 rounded-xl w-1/3"
								onClick={closePopup}
							>
								Cancel
							</button>
							<button
								className="bg-yellow-500 text-white px-4 py-2 ml-4 rounded-xl w-1/3"
								onClick={handleSave}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Savings;
