// import "./App.css";

import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Home() {
	return (
		<div className="bg-blue-950 h-screen w-screen">
			<NavBar />

			<div className=" h-[600px] w-full px-32 flex flex-row justify-center items-center gap-x-14">
				<div className="w-[550px] h-[550px] rounded-full bg-yellow-500 shadow-2xl border-6 border-blue-950 flex justify-center items-center">
					<div className="h-full w-full flex flex-col justify-center items-center">
						<div className=" h-20 w-full flex flex-row items-center justify-center font-bold text-7xl gap-x-1">
							<span className="text-3xl">₱</span>58,000.00
						</div>
						<div>Current Balance</div>
					</div>
				</div>
				<div className=" w-3/12 h-4/5 flex flex-col items-center justify-center gap-y-6">
					<Link to="/savings" className="h-full w-full">
						<div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
							<div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
								<span className="text-2xl">₱</span>45,000.00
							</div>
							<div className="text-sm">Total Savings</div>
						</div>
					</Link>
					<Link to="/expenses" className="h-full w-full">
						<div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
							<div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
								<span className="text-2xl">₱</span>18,000.00
							</div>
							<div className="text-sm">Total Expenses</div>
						</div>
					</Link>
					<Link to="/transactions" className="h-full w-full">
						<div className="bg-yellow-500 h-32 w-full rounded-2xl shadow-2xl border-6 border-blue-950 flex items-center justify-center flex-col hover:bg-yellow-400">
							<div className=" h-12 w-full flex flex-row items-center justify-center font-bold text-4xl gap-1">
								206
							</div>
							<div className="text-sm">
								Number of Transactions
							</div>
						</div>
					</Link>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Home;