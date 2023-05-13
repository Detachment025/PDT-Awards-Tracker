// React Icons
import { 
  VscChromeClose,
  VscTrash,
  VscSave,
  VscAdd
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Date verification import
const moment = require('moment');

// Custom imports
import { ErrorToaster, SuccessToaster } from '@/components/functionality/toasters';
import { ButtonCard } from '@/components/subcomponent/cards';
import { FreeAdd } from '@/components/subcomponent/freeadd';
import Nothing from '@/components/subcomponent/nothing';

// View functionality component definition
export default function EditComponent({ tracker, incomingData }) {
  // Define useStates
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [selectedStatusCategories, setSelectedStatusCategories] = useState([]);
  const [presence, setPresence] = useState(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length)

  // Create a router
  const router = useRouter();

  // Set the selectedStatusCategories on change of the selectedItem
  useEffect(() => {
    // Set selectedStatusCategories
    const data = JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()];
    if (selectedItem !== "" && Object.keys(data).length !== 0) {
      setSelectedData(data[selectedItem]);
      setSelectedStatusCategories(
        data[selectedItem]["statusCategories"]
      );
    }
    
    // Set award/pdt name input field
    (document.getElementById("name") != null) ? document.getElementById("name").value = selectedItem : null;
  }, [selectedItem]);

  // List Awards or PDTs
  const listAwardsOrPDTs = (
    <div 
      className="flex flex-col h-full overflow-y-scroll"
    >
      {Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).map((item) => (
        <ButtonCard
          key={item}
          text={item}
          size={"md"}
          setSelected={setSelectedItem}
        />
      ))}
    </div>
  );

  // Define the add button
  const addButton = (
    <div className="flex text-md items-center justify-center">
      <button 
        className="flex items-center justify-center bg-bermuda text-md px-2 py-[0.01rem] mr-1 rounded-lg text-white 
        hover:bg-darkbermuda hover:-translate-y-[0.07rem] hover:drop-shadow-lg"
        onClick={() => {router.push("/add")}}
      >
        <IconContext.Provider value={{size: "1em", className: "mr-1"}}>
          <VscAdd/>
        </IconContext.Provider>
        Add
      </button>
      <div>
        Some!
      </div>
    </div>
  );

  // Add Award or PDT with given settings
  const saveAwardOrPDT = () => {    
    // Get the value of the Award or PDT name
    const name = document.getElementById("name").value;

    // Check if the name field is not empty
    if (name === "") {
      // Create an error message and return
      ErrorToaster(`${tracker.slice(0, -1)} name is empty`)
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

    // Delete and Add Award or PDT to the data
    delete incomingData[tracker.toLowerCase()][selectedItem];
    setPresence(presence - 1);
    incomingData[tracker.toLowerCase()][name] = {
      statusCategories: selectedStatusCategories,
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
    setSelectedItem(name)
    setPresence(presence + 1);

    // Send success toaster
    SuccessToaster(`Changes for "${name}" ${tracker.slice(0, -1)} successfully saved`);

    // <!> DEBUG <!>
    // console.log(tracker.toLowerCase())
  }

  // Edit panel content definition
  const editPanel = (
    <div className="flex flex-row gap-4 w-full overflow-y-auto">
      <div className="flex flex-col gap-4 w-full pr-2 overflow-y-scroll">

        <div>
          <div className="text-xl">
            {`${tracker.slice(0, -1)} Name`}
          </div>
          <input 
            className="text-lg text-poppins border-2 rounded-lg h-auto px-1 focus:border-black shadow-inner w-full"
            defaultValue={selectedItem}
            type="text" 
            id="name" 
          />
        </div>

        <div>
          <div className="text-xl">
            {`Status Categories`}
          </div>
          <div className="border-2 rounded-lg shadow-inner">
            <FreeAdd
              itemList={selectedStatusCategories}
              setItemList={setSelectedStatusCategories}
              type="status category"
            />
          </div>
        </div>

        <div>
          <div className="text-xl">
            {`Expected Initial ARMS`}
          </div>
          <div className="flex flex-row gap-3">
            <input 
              id="ARMSDay" 
              maxLength="2"
              placeholder="DD"
              defaultValue={(selectedData === "") ? null : selectedData["initARMS"]["day"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
            <input 
              id="ARMSMonth" 
              maxLength="2"
              placeholder="MM"
              defaultValue={(selectedData === "") ? null : selectedData["initARMS"]["month"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
            <input 
              id="ARMSYear" 
              maxLength="4"
              placeholder="YYYY"
              defaultValue={(selectedData === "") ? null : selectedData["initARMS"]["year"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[3.1em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
          </div>
        </div>

        <div>
          <div className="text-xl">
            {`Expected Roster to DOT`}
          </div>
          <div className="flex flex-row gap-3">
            <input 
              id="DOTDay" 
              maxLength="2"
              placeholder="DD"
              defaultValue={(selectedData === "") ? null : selectedData["rosterDOT"]["day"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
            <input 
              id="DOTMonth" 
              maxLength="2"
              placeholder="MM"
              defaultValue={(selectedData === "") ? null : selectedData["rosterDOT"]["month"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
            <input 
              id="DOTYear" 
              maxLength="4"
              placeholder="YYYY"
              defaultValue={(selectedData === "") ? null : selectedData["rosterDOT"]["year"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[3.1em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
          </div>
        </div>

        <div className="flex-shrink-0 flex w-full">
          <button 
            className="flex flex-row justify-center items-center rounded-xl bg-bermuda mt-5 py-2 px-3
            hover:bg-darkbermuda hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
            onClick={saveAwardOrPDT}
          >
            <IconContext.Provider value={{color: "#ffffff", size: "1.4em"}}>
              <VscSave/>
            </IconContext.Provider>
            <div className="text-xl text-white ml-2">
              Save Changes
            </div>
          </button>
          <button 
            className="flex flex-row justify-center items-center rounded-xl bg-scarlet ml-4 mt-5 py-2 px-3
            hover:bg-darkscarlet hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
          >
            <IconContext.Provider value={{color: "#ffffff", size: "1.4em"}}>
              <VscTrash/>
            </IconContext.Provider>
            <div className="text-xl text-white ml-2">
              {`Delete ${tracker.slice(0, -1)}`}
            </div>
          </button>
        </div>
        
      </div>
      <div className=" w-full">
        <div className="text-xl">
          Edit Terms
        </div>
      </div>
    </div>
  )

  // Return edit component content
  return(
    <div className="flex-1 flex h-full overflow-y-auto gap-6">
      <div className="flex flex-col h-full w-1/5">
        <div className=" text-4xl mb-3"> 
          {tracker}
        </div>
        {
          !(presence > 0) ? 
          <Nothing mainText={`No ${tracker}`} subText={addButton}/> 
          : 
          listAwardsOrPDTs
        }
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className=" text-4xl mb-3"> 
          {(selectedItem !== "") ? `Edit ${selectedItem}` : `Edit ${tracker.slice(0, -1)}`} 
        </div>
        {
          !(presence > 0) ? 
          <Nothing mainText={`No ${tracker}`} subText={addButton}/> 
          : 
          (!selectedItem ? <Nothing mainText={`No ${tracker.slice(0, -1)} Selected`} subText={"Select One!"}/> : editPanel)
        }
      </div>
    </div>    
  )

}