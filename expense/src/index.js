import React from "react";
import "./index.css";
import Registration from "./App";

// import { BrowserRouter, Routes, Route} from react-router-dom;
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Registration />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
