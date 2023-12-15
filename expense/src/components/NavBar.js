import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="h-24 w-screen px-32 flex">
			<div className="h-full w-1/12 text-4xl font-bold text-yellow-400 flex items-center">
				<Link to="/home" className="hover:text-white">
					SpendR
				</Link>
			</div>
			<div className="h-full w-full font-semibold flex items-center justify-end text-yellow-400">
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
					<Link to="/transactions" className="px-6">
						<button className="h-12 w-28 hover:text-white mr-5">
							Transactions
						</button>
					</Link>
				</div>
				<div className="h-8 flex items-center justify-center rounded-lg hover:bg-white">
					<Link to="/">
						<button className="h-12 w-24 text-base text-red-600 flex items-center justify-center">
							Logout
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
