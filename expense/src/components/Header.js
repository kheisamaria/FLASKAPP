// Header.js

import React from "react";

const Header = ({ title, subtitle, description }) => {
	return (
		<div className="flex flex-col bg-yellow-500 h-80 w-full text-blue-950 gap-y-2 px-32 justify-center drop-shadow-2xl">
			<div className="w-full">
				<div className="font-semibold text-2xl">{subtitle}</div>
				<div className="font-semibold text-8xl">{title}</div>
			</div>
			<div className="w-5/12 text-md italic mt-1.5">{description}</div>
		</div>
	);
};

export default Header;
