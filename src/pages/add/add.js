// React Icons
import { 
  VscError,
  VscAdd,
  VscChromeClose
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useState, useEffect } from 'react';

// Date verification import
const moment = require('moment');

// Custom imports
import { ErrorToaster, SuccessToaster } from '@/components/functionality/toasters';
import { FreeAdd } from '@/components/subcomponent/freeadd';
import { Card } from '@/components/subcomponent/cards';
import { config } from '@/config/config';

// View functionality component definition
export default function AddComponent({ tracker, incomingData }) {
  // Variable declaration
  const [selectedList, setSelectedList] = useState(config[tracker.toLowerCase()]["defaultStatusCategories"])
  const [presence, setPresence] = useState(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length)

  // Set the defaults for the selected list on 
  useEffect(() => {
    setPresence(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length)
    setSelectedList(config[tracker.toLowerCase()]["defaultStatusCategories"])
  }, [tracker])

  // No Data Recorded sub-component
  const NoDataRecorded = (
    <div 
      className="h-full w-full flex flex-col items-center justify-center rounded-lg 
      border-2 border-dashed border-bermuda  text-bermuda"
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
    <div 
      className="flex flex-col h-full overflow-y-scroll"
    >
      {Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).map((item) => (
        <Card key={item} text={item} size={"2xl"}/>
      ))}
    </div>
  )

  // Refresh the selection to the default status categories
  const handleResetList = () => {
    document.getElementById("name").value = "";
    document.getElementById("ARMSDay").value = "";
    document.getElementById("ARMSMonth").value = "";
    document.getElementById("ARMSYear").value = "";
    document.getElementById("DOTDay").value = "";
    document.getElementById("DOTMonth").value = "";
    document.getElementById("DOTYear").value = "";
    setSelectedList(config[tracker.toLowerCase()]["defaultStatusCategories"]);
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

    // Set up variables for the all-or-nothing condition on all inputs for the ARMS field
    const armsDay = document.getElementById("ARMSDay").value === "";
    const armsMonth = document.getElementById("ARMSMonth").value === "";
    const armsYear = document.getElementById("ARMSYear").value === "";

    // Check if the inputs are aligned
    if (!(armsDay == armsMonth && armsMonth == armsYear)) {
      // Create an error message and return
      ErrorToaster("Expected initial ARMS field needs to be fully filled or empty")
      return;  
    }
    
    // Proceed to check the date validity of the given inputs
    if(!moment(document.getElementById("ARMSDay").value
      + "-" + document.getElementById("ARMSMonth").value
      + "-" + document.getElementById("ARMSYear").value, "D-M-YYYY", true).isValid() 
      && !(armsDay && armsMonth && armsYear)
    ) {
      // Create an error message and return
      ErrorToaster("Expected initial ARMS field has incorrect date inputted")
      return;  
    }

    // Set up variables for the all-or-nothing condition on all inputs for the ARMS field
    const dotDay = document.getElementById("DOTDay").value === "";
    const dotMonth = document.getElementById("DOTMonth").value === "";
    const dotYear = document.getElementById("DOTYear").value === "";

    // Check if the inputs are aligned
    if (!(dotDay == dotMonth && dotMonth == dotYear)) {
      // Create an error message and return
      ErrorToaster("Expected roster to DOT field needs to be fully filled or empty")
      return;  
    }
    
    // Proceed to check the date validity of the given inputs
    if(!moment(document.getElementById("DOTDay").value
      + "-" + document.getElementById("DOTMonth").value
      + "-" + document.getElementById("DOTYear").value, "D-M-YYYY", true).isValid()
      && !(dotDay && dotMonth && dotYear)
    ) {
      // Create an error message and return
      ErrorToaster("Expected roster to DOT field has incorrect date inputted")
      return;  
    }

    // Add Award or PDT to the data
    incomingData[tracker.toLowerCase()][name] = {
      statusCategories: selectedList,
      initARMS: {
        day: document.getElementById("ARMSDay").value,
        month: document.getElementById("ARMSMonth").value,
        year: document.getElementById("ARMSYear").value,
      },
      rosterDOT: {
        day: document.getElementById("DOTDay").value,
        month: document.getElementById("DOTMonth").value,
        year: document.getElementById("DOTYear").value,
      },
      terms: {}
    }

    // Write to localStorage and set useState
    localStorage.setItem("data", JSON.stringify(incomingData));
    setPresence(presence + 1);

    // Clear inputs
    handleResetList();

    // Send success toaster
    SuccessToaster(`"${name}" ${tracker.slice(0, -1)} successfully created`)

    // <!> DEBUG <!>
    // console.log(JSON.parse(localStorage.getItem("data")))
  }

  // Handle enter key press on the award/pdt name field
  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      addAwardOrPDT();
    }
  }

  // Render the View functionality component 
  return(
    <div className="flex-1 flex h-full overflow-y-auto gap-6">
      <div className="flex flex-col overflow-y-scroll pr-4 w-8/12 h-full">
        <div className=" text-4xl mb-3">
          {`Add New ${tracker.slice(0, -1)}`} 
        </div>
        <div className="flex-1 flex flex-col gap-4">

          <div className="flex-shrink-0 flex flex-col gap-1">
            <div className="text-2xl">
              {`${tracker.slice(0, -1)} Name:`} 
            </div>
            <input 
              type="text" 
              id="name" 
              className="text-xl  border-2 rounded-lg h-auto px-1 focus:border-black shadow-inner"
              onKeyDown={handleEnterPress}
            />
          </div>

          <div className="flex-1 flex flex-col h-1/2 gap-1">
            <div className="text-2xl">
              Status Categories: 
            </div>
            <div className="border-2 h-full rounded-lg shadow-inner">
              <FreeAdd
                itemList={selectedList}
                setItemList={setSelectedList}
                type="status category"
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col justify-center w-full gap-1">
            <div className="flex flex-row text-2xl gap-1">
                <div>
                  Expected Initial ARMS
                </div>
                <div className="text-gray-400 italic">(Optional)</div>
            </div>
            <div className="flex flex-row gap-3">
              <input 
                placeholder="DD"
                id="ARMSDay" 
                pattern="[0-9]*" 
                maxLength="2"
                className="text-xl text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
                onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
              />
              <input 
                placeholder="MM"
                id="ARMSMonth" 
                pattern="[0-9]*" 
                maxLength="2"
                className="text-xl text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
                onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
              />
              <input 
                placeholder="YYYY"
                id="ARMSYear" 
                pattern="[0-9]*" 
                maxLength="4"
                className="text-xl text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[4em]"
                onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col w-full gap-1">
            <div className="flex flex-row text-2xl gap-1">
                <div>
                  Expected Roster to DOT
                </div>
                <div className="text-gray-400 italic">(Optional)</div>
            </div>
            <div className="flex flex-row gap-3">
              <input 
                placeholder="DD"
                id="DOTDay" 
                pattern="[0-9]*" 
                maxLength="2"
                className="text-xl text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
                onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
              />
              <input 
                placeholder="MM"
                id="DOTMonth" 
                pattern="[0-9]*" 
                maxLength="2"
                className="text-xl text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
                onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
              />
              <input 
                placeholder="YYYY"
                id="DOTYear" 
                pattern="[0-9]*" 
                maxLength="4"
                className="text-xl text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[4em]"
                onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
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
        <div className=" text-4xl mb-3">
          {`${tracker}`} 
        </div>
        {
          !(presence > 0) ? 
          NoDataRecorded 
          : 
          listAwardsOrPDTs
        }
      </div>
    </div>
  );
}