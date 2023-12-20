import React from "react";
import { Link } from "react-router-dom";

const DeleteAccountPopup = ({ handleDelete, closePopup }) => {
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
				<div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
				<div className="bg-white p-4 px-8 w-[450px] h-[400px] rounded-lg z-10 flex flex-col first-letter justify-center items-center gap-y-2">
					<img
						src="/images/trash-can.png"
						alt="error"
						className="w-36 h-36 flex items-center justify-center"
						// onClick={}
					/>
					<div className="my-5 flex items-center justify-center text-center">
						Deleting your account will eradicate all your associated
						files. Continue?
					</div>
					<div className="flex flex-row gap-x-3 w-full items-center justify-center">
						<button
							className="bg-yellow-400 text-white px-4 py-2 rounded-xl w-1/2 h-[45px] opacity-90 hover:opacity-100"
							onClick={closePopup}
						>
							Cancel
						</button>
						<Link to="/" className="w-1/2">
							<button
								className="bg-red-500 text-white px-4 py-2 rounded-xl w-full h-[45px] opacity-90 hover:opacity-100"
								onClick={handleDelete}
							>
								Confirm
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteAccountPopup;
