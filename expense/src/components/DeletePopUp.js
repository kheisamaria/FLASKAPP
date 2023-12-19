import React from "react";

const DeletePopUp = ({ title, handleDelete, closePopup }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
			<div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
			<div className="bg-white p-8 w-[430px] h-[390px] rounded-lg z-10 flex flex-col first-letter justify-center items-center gap-y-2">
				<img
					src="/images/bin.png"
					alt="error"
					className="w-28 h-28 mt-3 flex items-center justify-center my-3"
				/>
				<div className="flex text-center items-center justify-center py-2">
					Are you sure you want to delete this {title}?
				</div>
				<div className="flex flex-col w-full justify-center items-center my-2">
					<button
						className="bg-red-600 text-white rounded-xl w-2/3 h-[45px] my-1 opacity-75 hover:opacity-100"
						onClick={handleDelete}
					>
						Delete
					</button>
					<button
						className="bg-gray-600 text-white rounded-xl w-2/3 h-[45px] my-1 opacity-75 hover:opacity-100"
						onClick={closePopup}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeletePopUp;
