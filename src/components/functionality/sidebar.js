// React Icons
import {
  VscBook,
  VscAdd,
  VscExport,
  VscSearch,
  VscInfo,
  VscChevronUp,
  VscChevronDown,
} from "react-icons/vsc";
import { IconContext } from "react-icons";

// React.js & Next.js libraries
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

// Cookies
import Cookies from "js-cookie";

// Image
import logo from "../../public/logobw.png";

// Login Page definitions
const Sidebar = ({ setOutsideTracker }) => {
  // Set dropdown menu state(s)
  const [tracker, setTracker] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Get current path and router
  const router = useRouter();
  const currentPath = usePathname();

  // Set outside tracker's value
  useEffect(() => {
    setOutsideTracker(tracker);
    setTracker(Cookies.get("selectedTracker") || "Awards");
  }, [tracker]);

  // List of items for the sidebar
  const menuItems = [
    {
      title: "Overview",
      link: "overview",
      icon: <VscBook />,
    },
    {
      title: "Search",
      link: "search",
      icon: <VscSearch />,
    },
    {
      title: `Add or Edit`,
      link: "add_edit",
      icon: <VscAdd />,
    },
    {
      title: `Export`,
      link: "export",
      icon: <VscExport />,
    },
    {
      title: `Info`,
      link: "info",
      icon: <VscInfo />,
    },
  ];

  // Render the items list
  const menuList = menuItems.map((item) => (
    <button
      key={`${item.title.toLowerCase()}`}
      className={`${
        currentPath == `/${item.link}`
          ? `bg-white hover:-translate-y-[0.1rem] hover:shadow-md
					hover:shadow-white`
          : `hover:bg-silver hover:-translate-y-[0.1rem] hover:shadow-md
					hover:shadow-silver`
      }
				px-3 py-2 my-1 mx-2 w-10/12 flex justify-start items-center rounded-lg`}
      onClick={() => router.push(`/${item.link}`)}
    >
      <IconContext.Provider
        value={{
          color: currentPath == `/${item.link}` ? "#000000" : "#FFFFFF",
          size: "1.5em",
          className: "mr-2",
        }}
      >
        {item.icon}
      </IconContext.Provider>
      <div
        className={`text-${
          currentPath == `/${item.link}` ? "black" : "white"
        }  text-lg ml-2`}
      >
        {item.title}
      </div>
    </button>
  ));

  // List of different things to track
  const trackerItems = ["Awards", "PDTs"];

  // Render the trackers list
  const trackerList = trackerItems.map((item) => (
    <button
      key={`${item.toLowerCase()}`}
      onClick={() => {
        Cookies.set("selectedTracker", item);
        setTracker(item);
        setIsOpen(!isOpen);
      }}
      className={`flex  justify-start w-full px-4 py-2 text-gray-800
			rounded-lg hover:bg-gray-100
			${item === tracker ? "text-bermuda" : ""}`}
    >
      {item}
    </button>
  ));

  // Component return
  return (
    <div className="h-full bg-black w-[17rem] drop-shadow-xl">
      <div className="h-full flex flex-col justify-between">
        <div className="grid justify-items-center">
          <div className=" text-white text-sm mx-5 mt-5 mb-10">
            <Image alt="Logo" src={logo} width={152} height={152} />
            <div className="text-center mt-4">PDT & Awards Tracker</div>
          </div>
          {menuList}
        </div>
        <div className="flex flex-col">
          {isOpen && (
            <div className="w-auto mx-4 bg-white rounded-lg shadow-lg">
              {trackerList}
            </div>
          )}
          <div className="bg-white mb-4 mx-4 mt-2 px-3 py-1 rounded-lg">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="w-full flex justify-between items-center"
            >
              <div className=" text-lg">{tracker}</div>
              <div className="text-black">
                {(!isOpen && <VscChevronUp size="1.5em" />) ||
                  (isOpen && <VscChevronDown size="1.5em" />)}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Dashboard page
export default Sidebar;
