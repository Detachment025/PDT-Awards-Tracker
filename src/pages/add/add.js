// React Icons
import { 
  VscError,
  VscAdd,
  VscChromeClose
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useEffect, useState } from 'react';

// Custom imports
import { ErrorToaster, SuccessToaster } from '@/components/toasters';
import FreeAdd from '@/components/freeadd';

// View functionality component definition
export default function AddComponent({ tracker, incomingData }) {
  // Variable declaration
  const [awardStatuses, setAwardStatuses] = useState(["Awarded", "Nominated"]);
  const [PDTStatuses, setPDTStatuses] = useState(["Applied", "Accepted"]);

  // No Data Recorded sub-component
  const NoDataRecorded = (
    <div 
      className="h-full w-full flex flex-col items-center justify-center rounded-lg 
      border-2 border-dashed border-bermuda font-poppins text-bermuda"
    >
      <IconContext.Provider value={{size: "5em", className: "mb-3"}}>
        <VscError/>
      </IconContext.Provider>
      <div className="text-xl">
        {`No ${tracker}`}
      </div>
      <div className="flex text-md items-center justify-center">
        Add Some!
      </div>
    </div> 
  );

  // List Awards or PDTs
  // scrollbar-thin scrollbar-thumb-lightgray scrollbar-track-transparent scrollbar-thumb-rounded
  const listAwardsOrPDTs = (
    <div 
      className="flex flex-col h-full overflow-y-scroll"
    >
      {Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).map((item, index) => (
        <div 
          className="text-poppins text-3xl bg-white shadow-inner rounded-lg border-2 mr-4 mb-4 px-2 py-2"
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  )

  // Refresh the selection to the default statuses
  const handleResetList = () => {
    document.getElementById("name").value = "";
    setAwardStatuses(["Awarded", "Nominated"]);
    setPDTStatuses(["Applied", "Accepted"]);
  };

  // Add Award or PDT with given settings
  const addAwardOrPDT = () => {    
    // Get the value of the Award or PDT name
    const name = document.getElementById("name").value

    // Check if the name field is not empty
    if (name === "") {
      // Create an error message and return
      ErrorToaster(`${tracker.slice(0, -1)} name is empty`)
      return;
    }

    // Check if the Award or PDT being added already exists
    if (Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).includes(name)) {
      // Create an error message and return
      ErrorToaster(`"${name}" ${tracker.slice(0, -1)} already exists`)
      return;
    }

    // Add Award or PDT to the data
    incomingData[tracker.toLowerCase()][name] = {
      statuses: (tracker === "Awards" ? awardStatuses : PDTStatuses),
      details: {}
    }

    // Write to localStorage
    localStorage.setItem("data", JSON.stringify(incomingData));

    // Clear inputs
    document.getElementById("name").value = "";
    handleResetList();

    // Send success toaster
    SuccessToaster(`"${name}" ${tracker.slice(0, -1)} successfully created`)
  }

  // Render the View functionality component 
  return(
    <div className="flex-1 flex h-full overflow-y-auto">
      <div className="flex flex-col w-8/12 h-full mr-6">
        <div className="font-poppins text-4xl mb-3">
          {`Add New ${tracker.slice(0, -1)}`} 
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-shrink-0 flex flex-col mb-4">
            <div className="text-2xl mr-2">
              {`${tracker.slice(0, -1)} Name:`} 
            </div>
            <input 
              type="text" 
              id="name" 
              className="text-xl text-poppins border-2 rounded-lg h-auto px-1 focus:border-black shadow-inner"
            />
          </div>
          <div className="flex-1 flex flex-col h-1/2">
            <div className="text-2xl mr-2">
              Statuses: 
            </div>
            <div className="border-2 h-full rounded-lg shadow-inner">
              <FreeAdd
                itemList={(tracker === "Awards" ? awardStatuses : PDTStatuses)}
                setItemList={(tracker === "Awards" ? setAwardStatuses : setPDTStatuses)}
                type="status"
              />
            </div>
          </div>
          <div className="flex-shrink-0 flex w-full">
            <button 
              className="flex flex-row justify-center items-center rounded-xl bg-bermuda mt-5 py-2 px-3
              hover:bg-darkbermuda hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
              onClick={() => {addAwardOrPDT()}}
            >
              <IconContext.Provider value={{color: "#ffffff", size: "1.6em"}}>
                <VscAdd/>
              </IconContext.Provider>
              <div className="text-2xl text-white ml-2">
                {`Add ${tracker.slice(0, -1)}`}
              </div>
            </button>
            <button 
              className="flex flex-row justify-center items-center rounded-xl bg-scarlet ml-4 mt-5 py-2 px-3
              hover:bg-darkscarlet hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
              onClick={() => {handleResetList()}}
            >
              <IconContext.Provider value={{color: "#ffffff", size: "1.6em"}}>
                <VscChromeClose/>
              </IconContext.Provider>
              <div className="text-2xl text-white ml-2">
                Reset
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className="font-poppins text-4xl mb-3">
          {`${tracker}`} 
        </div>
        {!(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length !== 0) ? NoDataRecorded : listAwardsOrPDTs}
      </div>
    </div>
  );
}