// Cookies
import Cookies from "js-cookie";

// React.js & Next.js libraries
import { useState, useEffect, useContext } from 'react';

// Custom components
import Data from "./data";

// Data file check definitions
const DataCheck = () => {
	// Set dropdown menu state(s)
	const [data, setData] = useState();
	const [response, setResponse] = useState();

	const jsonData = useContext(Data);

	// Set hook 
	useEffect(() => {
		setData(Cookies.get("data"))
		setResponse(
			(data === "") && (
				<div className="h-3/4 w-full pb-10 flex items-center justify-center font-poppins text-2xl">
					<div className="font-poppins text-xl">There is no data selected,</div>
					<button className="bg-bermuda text-xl px-2 py-1 mx-2 rounded-lg" onClick={click}>Import</button>
					<div className="or">or</div>
					<button className="bg-bermuda text-xl px-2 py-1 mx-2 rounded-lg" onClick={click}>Create New Dataset</button>
					<div className="or">.</div>
				</div>
			)
		)
	}, [data]);

	// Button click handler
	const click = () => {
		Cookies.set("data", "r")
		setData(Cookies.get("data"))
	}

	// Returned information
	return(<>{response}</>);

}

// Export component
export default DataCheck;