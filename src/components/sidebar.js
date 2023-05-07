// React Icons
import { 
	VscBook, 
	VscAdd,
	VscEdit,
	VscTrash,
	VscSearch,
	VscChevronUp,
	VscChevronDown
} from 'react-icons/vsc';

// Cookies
import Cookies from "js-cookie";

// React.js & Next.js libraries
import { useState } from 'react';
import { IconContext } from "react-icons";
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import React from "react";

// Login Page definitions
const Sidebar = () => {
	// Set dropdown menu state(s)
	const [tracker, setTracker] = useState("Awards");
	const [isOpen, setIsOpen] = useState(false);

	// Get current path and router
	const router = useRouter();
	const currentPath = usePathname();

	// List of items for the sidebar
	const menuItems = [
		{
			title: "View",
			icon: <VscBook/>
		},
		{
			title: "Add",
			icon: <VscAdd/>
		},
		{
			title: "Update",
			icon: <VscEdit/>
		},
		{
			title: "Delete",
			icon: <VscTrash/>
		},
		{
			title: "Find",
			icon: <VscSearch/>
		}
	];

	// Render the items list
	const menuList = menuItems.map(item => (
		<button 
			key={`${item.title.toLowerCase()}`} 
			className={
				`${(currentPath == `/${item.title.toLowerCase()}`) ? 
					"bg-white hover:-translate-y-[0.1rem] hover:shadow-md hover:shadow-white" : 
					"hover:bg-silver hover:-translate-y-[0.1rem] hover:shadow-md hover:shadow-silver"} 
				px-3 py-2 my-1 mx-2 w-10/12 flex justify-start items-center rounded-lg`
			} 
			onClick={() => router.push(`/${item.title.toLowerCase()}`)}
		>
			<IconContext.Provider value={{color: (currentPath == `/${item.title.toLowerCase()}`) ? "#000000" : "#FFFFFF", size: "1.5em", className: "mr-2"}}>
				{item.icon}
			</IconContext.Provider>
			<div className={`text-${(currentPath == `/${item.title.toLowerCase()}`) ? "black" : "white"} font-poppins text-lg ml-2`}>
				{item.title}
			</div>
		</button>
	));

	// List of different things to track
	const trackerItems = [
		"Awards", 
		"PDTs"
	];

	// Render the trackers list
	const trackerList = trackerItems.map(item => (
		<button 
			key={`${item.toLowerCase()}`} 
			onClick={() => {
				Cookies.set("selectedTracker", item);
				setTracker(Cookies.get("selectedTracker"));
				setIsOpen(!isOpen);
			}}
			className={
				`flex font-poppins justify-start w-full px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-100
				${(item.toLowerCase() == tracker.toLowerCase()) ? "font-bold" : ""}`
			}
		>
			{item}
		</button>
	));

	// Component return
	return (
		<div className="h-full bg-black w-[14rem] drop-shadow-xl">
			<div className="h-full flex flex-col justify-between">
				<div className="grid justify-items-center">
					<div className="font-poppins text-white text-3xl mt-10 mb-12">
						Tracker
					</div>
					{menuList}
				</div>
				<div className='flex flex-col'>
					{isOpen && (
						<div className="w-auto mx-4 bg-white rounded-lg shadow-lg">
							{trackerList}
						</div>
					)}
					<div className="bg-white mb-4 mx-4 mt-2 px-3 py-1 rounded-lg">
						<button onClick={() => {setIsOpen(!isOpen)}} className="w-full flex justify-between items-center">
							<div className="font-poppins text-lg">
								{tracker}
							</div>
							<div className="text-black">
								{(!isOpen && <VscChevronUp size="1.5em"/>) || (isOpen && <VscChevronDown size="1.5em"/>)}
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Export the Dashboard page
export default Sidebar;