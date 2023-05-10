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

// View functionality component definition
export default function AddComponent({ tracker, incomingData }) {
  // Variable declaration
  const [awardStatuses, setAwardStatuses] = useState(["Awarded", "Nominated"]);
  const [PDTStatuses, setPDTStatuses] = useState(["Applied", "Accepted"]);
  const [listContent, setListContent] = useState(
    Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length !== 0
  );

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
  const listAwardsOrPDTs = (
    Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).map((item, index) => (
      <div className="text-poppins text-2xl bg-white shadow-inner rounded-lg border-2 my-2 px-2 py-2">
        {item}
      </div>
    ))
  )

  // Handle change of the input field's content
  const handleInputChange = (index, value) => {
    // Check if the value is in the list
    if ((tracker === "Awards" ? awardStatuses : PDTStatuses).includes(value)) {
      // Send error message
      ErrorToaster(`"${value}" status exists already`);

      // Return
      return;
    }

    // Update statuses
    const newInputs = [...(tracker === "Awards" ? awardStatuses : PDTStatuses)];
    newInputs[index] = value;
    (tracker === "Awards" ? setAwardStatuses(newInputs) : setPDTStatuses(newInputs));
  };

  // Update statuses on element delete
  const handleDeleteItem = (index) => {
    const newList = [...(tracker === "Awards" ? awardStatuses : PDTStatuses)];
    newList.splice(index, 1);
    (tracker === "Awards" ? setAwardStatuses(newList) : setPDTStatuses(newList));
  };

  // Refresh the selection to the default statuses
  const handleResetList = () => {
    setAwardStatuses(["Awarded", "Nominated"]);
    setPDTStatuses(["Applied", "Accepted"]);
  };

  // Add Award or PDT with given settings
  const addAwardOrPDT = () => {    
    // Add Award or PDT to the data
    incomingData[tracker.toLowerCase()][document.getElementById("name").value] = {
      statuses: (tracker === "Awards" ? awardStatuses : PDTStatuses),
      details: {}
    }

    // Write to localStorage and update listContent
    localStorage.setItem("data", JSON.stringify(incomingData));
    setListContent(true)

    // Clear inputs
    document.getElementById("name").value = ""
    handleResetList();

    console.log(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]));
  }

  // Render the View functionality component 
  return(
    <div className="flex-1">
      <div className="flex h-full">
      <div className="flex flex-col w-8/12 h-full mr-6">
        <div className="font-poppins text-4xl mb-3">
          {`Add New ${tracker.slice(0, -1)}`} 
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-shrink-0 flex flex-col py-4">
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
              <ul className="flex flex-wrap p-3">
                {(tracker === "Awards" ? awardStatuses : PDTStatuses).map((item, index) => (
                  <li 
                    className="flex rounded-xl text-lg bg-lightgray m-1 py-2 px-2 w-[10rem]" 
                    key={index}
                  >
                    <input 
                      type="text" 
                      value={item}
                      className="text-xl text-poppins text-black placeholder-silver bg-transparent px-1 w-full"
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    <button onClick={() => {handleDeleteItem(index)}}>
                      <IconContext.Provider value={{color: "#000000", size: "1.3em"}}>
                        <VscChromeClose/>
                      </IconContext.Provider>
                    </button>
                  </li>
                ))}
                <button 
                  className="rounded-xl bg-bermuda m-1 py-2 px-2 flex flex-row justify-center items-center
                  hover:bg-darkbermuda hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
                  onClick={() => {
                    tracker === "Awards" ? 
                    setAwardStatuses([...awardStatuses, `Status #${awardStatuses.length + 1}`]) 
                    : 
                    setPDTStatuses([...PDTStatuses, `Status #${awardStatuses.length + 1}`])
                  }}
                >
                  <IconContext.Provider value={{color: "#ffffff", size: "1.3em"}}>
                    <VscAdd/>
                  </IconContext.Provider>
                  <div className="ml-1 text-white text-lg">
                    Add Status
                  </div>
                </button>
              </ul>
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
        <div className="flex-1">
          {!listContent ? NoDataRecorded : listAwardsOrPDTs}
        </div>
      </div>
    </div>
    </div>
  );
}