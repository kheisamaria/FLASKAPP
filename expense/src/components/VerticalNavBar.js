// VerticalNavBar.js

import React from "react";
import { Link } from "react-router-dom";

const VerticalNavBar = ({ isSettingsClicked, handleSettingsClick }) => {
	return (
		<div className="h-full w-full font-semibold flex items-center justify-end text-yellow-500 flex-col">
			<div className="h-full w-full flex justify-center">
				<div className="h-24 w-32 text-4xl font-bold text-yellow-500 flex justify-center">
					<Link to="/home" className="hover:text-white pr-2">
						SpendR
					</Link>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center gap-y-3 text-lg">
				<div>
					<Link to="/savings" className="px-6">
						<button className="h-12 w-28 hover:text-white">
							Savings
						</button>
					</Link>
				</div>
				<div>
					<Link to="/expenses" className="px-6">
						<button className="h-12 w-28 hover:text-white">
							Expenses
						</button>
					</Link>
				</div>
				<div>
					<Link to="/transactions" className="px-9">
						<button className="h-12 w-28 hover:text-white">
							Transactions
						</button>
					</Link>
				</div>

				{isSettingsClicked && (
					<div className="flex flex-col justify-center items-center">
						<div>
							<Link to="/editprofile" className="px-6">
								<button className="h-12 w-28 hover:text-white my-1">
									Edit Profile
								</button>
							</Link>
						</div>
						<div>
							<Link to="/" className="px-6">
								<button className="h-12 w-28 hover:text-white my-1">
									Logout
								</button>
							</Link>
						</div>
					</div>
				)}

				<div className="h-12 flex items-center justify-center rounded-lg hover:bg-white p-3">
					<button className="h-12 w-fit text-base text-red-600 flex items-center justify-center">
						<img
							src="/images/settings-red.png"
							alt="edit"
							className="w-8 h-8 mx-8"
							onClick={handleSettingsClick}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default VerticalNavBar;
