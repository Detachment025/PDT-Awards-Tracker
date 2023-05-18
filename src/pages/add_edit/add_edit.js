// React Icons
import { 
  VscError,
  VscAdd,
  VscSave,
  VscRefresh,
  VscTrash,
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
import { ButtonCard } from '@/components/subcomponent/cards';
import { config } from '@/config/config';

// View functionality component definition
export default function AddEditComponent({ tracker, incomingData }) {
  // Variable declaration
  const [statusList, setStatusList] = useState(config[tracker.toLowerCase()]["defaultStatusCategories"]);
  const [presence, setPresence] = useState(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length);
  const [selectedData, setSelectedData] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  // Set the defaults for the selected list on 
  useEffect(() => {
    setPresence(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length)
    setStatusList(config[tracker.toLowerCase()]["defaultStatusCategories"])
  }, [tracker])

  // Set the selectedStatusCategories on change of the selectedItem
  useEffect(() => {
    // Set selectedStatusCategories
    const data = JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()];
    if (selectedItem !== "" && Object.keys(data).length !== 0) {
      // Set useState
      setSelectedData(data[selectedItem]);
      setStatusList(data[selectedItem]["statusCategories"]);

      // Set input fields
      document.getElementById("name").value = selectedItem;
      document.getElementById("ARMSMonth").value = data[selectedItem]["initARMS"]["month"];
      document.getElementById("ARMSYear").value = data[selectedItem]["initARMS"]["year"];
      document.getElementById("DOTMonth").value = data[selectedItem]["rosterDOT"]["month"];
      document.getElementById("DOTYear").value = data[selectedItem]["rosterDOT"]["year"];
    } else {
      handleResetList();
    }
  }, [selectedItem]);

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
        <ButtonCard key={item} text={item} size={"xl"} setSelected={setSelectedItem}/>
      ))}
    </div>
  )

  // Refresh the selection to the default status categories
  const handleResetList = () => {
    // If not editing an item, set the input fields into their default values
    if (selectedItem == "") {
      document.getElementById("name").value = "";
      document.getElementById("ARMSMonth").value = "08";
      document.getElementById("ARMSYear").value = moment().year();
      document.getElementById("DOTMonth").value = "";
      document.getElementById("DOTYear").value = "";
      setStatusList(config[tracker.toLowerCase()]["defaultStatusCategories"]);
    
    // If editing an item, set it to the item's previous values
    } else {
      document.getElementById("name").value = selectedItem;
      document.getElementById("ARMSMonth").value = selectedData["initARMS"]["month"];
      document.getElementById("ARMSYear").value = selectedData["initARMS"]["year"];
      document.getElementById("DOTMonth").value = selectedData["rosterDOT"]["month"];
      document.getElementById("DOTYear").value = selectedData["rosterDOT"]["year"];
      setStatusList(selectedData["statusCategories"]);
    }
    
  };

  // Add Award or PDT with given settings
  const addEditAwardOrPDT = () => {    
    // Get the value of the Award or PDT name
    const name = document.getElementById("name").value

    // Check if the name field is not empty
    if (name === "") {
      // Create an error message and return
      ErrorToaster(`${tracker.slice(0, -1)} name is empty`)
      return;
    }

    // Check if the Award or PDT being added already exists
    if (
      Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).includes(name)
      && selectedItem === ""
    ) {
      // Create an error message and return
      ErrorToaster(`"${name}" ${tracker.slice(0, -1)} already exists`)
      return;
    }

    // Set up variables for the all-or-nothing condition on all inputs for the ARMS field
    const armsMonth = document.getElementById("ARMSMonth").value === "";
    const armsYear = document.getElementById("ARMSYear").value === "";

    // Check if the inputs are aligned
    if (armsMonth && armsYear) {
      // Create an error message and return
      ErrorToaster("Expected initial ARMS field needs to be fully filled")
      return;  
    }
    
    // Proceed to check the date validity of the given inputs
    if(!moment("25-" + document.getElementById("ARMSMonth").value
      + "-" + document.getElementById("ARMSYear").value, "D-M-YYYY", true).isValid() 
      && !(armsMonth && armsYear)
    ) {
      // Create an error message and return
      ErrorToaster("Expected initial ARMS field has incorrect date inputted")
      return;  
    }

    // Set up variables for the all-or-nothing condition on all inputs for the ARMS field
    const dotMonth = document.getElementById("DOTMonth").value === "";
    const dotYear = document.getElementById("DOTYear").value === "";

    // Check if the inputs are aligned
    if (!((dotMonth && dotYear) || (!dotMonth && !dotYear))) {
      // Create an error message and return
      ErrorToaster("Expected roster to DOT field needs to be fully filled or empty")
      return;  
    }
    
    // Proceed to check the date validity of the given inputs
    if(!moment("25-" + document.getElementById("DOTMonth").value 
      + "-" + document.getElementById("DOTYear").value, "D-M-YYYY", true).isValid()
      && !(dotMonth && dotYear)
    ) {
      // Create an error message and return
      ErrorToaster("Expected roster to DOT field has incorrect date inputted")
      return;  
    }

    // Delete and Add Award or PDT to the data
    delete incomingData[tracker.toLowerCase()][selectedItem];
    incomingData[tracker.toLowerCase()][name] = {
      statusCategories: statusList,
      initARMS: {
        month: document.getElementById("ARMSMonth").value,
        year: document.getElementById("ARMSYear").value,
      },
      rosterDOT: {
        month: document.getElementById("DOTMonth").value,
        year: document.getElementById("DOTYear").value,
      },
      terms: {}
    }

    // Write to localStorage and set useState
    localStorage.setItem("data", JSON.stringify(incomingData));
    if (selectedItem === "")
      setPresence(presence + 1);
    setSelectedItem("");

    // Clear inputs
    handleResetList();

    // Send success toaster
    SuccessToaster(`"${name}" ${tracker.slice(0, -1)} successfully ${selectedItem === "" ? "created" : "updated"}`);

    // <!> DEBUG <!>
    // console.log(JSON.parse(localStorage.getItem("data")))
  }

  // Handle the deletion of an item
  const deleteItem = () => {
    // Delete and Add Award or PDT to the data
    delete incomingData[tracker.toLowerCase()][selectedItem];
    setPresence(presence - 1);

    // Write to localStorage and set useState
    localStorage.setItem("data", JSON.stringify(incomingData));
    setSelectedItem("");

    // Clear inputs
    handleResetList();

    // Send success toaster
    SuccessToaster(`"${selectedItem}" ${tracker.slice(0, -1)} successfully deleted`);
  }

  // Handle enter key press on the award/pdt name field
  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      addEditAwardOrPDT();
    }
  }

  // Render the View functionality component 
  return(
    <div className="flex-1 flex h-full overflow-y-auto gap-6">
      <div className="flex flex-col overflow-y-scroll pr-4 w-8/12 h-full">
        <div className="truncate text-4xl mb-3">
          {selectedItem === "" ? `Add New ${tracker.slice(0, -1)}` : `Edit ${selectedItem} ${tracker.slice(0, -1)}`} 
        </div>
        <div className="flex-1 flex flex-col gap-4">

          <div className="flex-shrink-0 flex flex-col gap-1">
            <div className="text-2xl">
              {`${tracker.slice(0, -1)} Name:`} 
            </div>
            <input 
              type="text" 
              placeholder="Enter a name"
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
                itemList={statusList}
                setItemList={setStatusList}
                type="status"
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col justify-center w-full gap-1">
            <div className="flex flex-row text-2xl gap-1">
                <div>
                  Expected Initial ARMS
                </div>
            </div>
            <div className="flex flex-row gap-3">
              <input 
                placeholder="MM"
                id="ARMSMonth" 
                pattern="[0-9]*" 
                defaultValue="08"
                maxLength="2"
                className="text-xl text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
                onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
              />
              <input 
                placeholder="YYYY"
                id="ARMSYear" 
                pattern="[0-9]*" 
                defaultValue={moment().year()}
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
              onClick={() => {addEditAwardOrPDT()}}
            >
              <IconContext.Provider value={{color: "#ffffff", size: "1.6em"}}>
                {selectedItem === "" ? <VscAdd/> : <VscSave/>}
              </IconContext.Provider>
              <div className="text-md text-white ml-2">
                {selectedItem === "" ? `Add ${tracker.slice(0, -1)}` : `Save Changes`}
              </div>
            </button>
            <button 
              className="flex flex-row justify-center items-center rounded-xl bg-malibu ml-4 mt-5 py-2 px-3
              hover:bg-darkmalibu hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
              onClick={() => {handleResetList()}}
            >
              <IconContext.Provider value={{color: "#ffffff", size: "1.6em"}}>
                <VscRefresh/>
              </IconContext.Provider>
              <div className="text-md text-white ml-2">
              {selectedItem === "" ? `Reset` : `Undo Changes`}
              </div>
            </button>
            {
              selectedItem !== "" &&
              <button 
                className="flex flex-row justify-center items-center rounded-xl bg-scarlet ml-4 mt-5 py-2 px-3
                hover:bg-darkscarlet hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
                onClick={() => {deleteItem()}}
              >
                <IconContext.Provider value={{color: "#ffffff", size: "1.6em"}}>
                  <VscTrash/>
                </IconContext.Provider>
                <div className="text-md text-white ml-2">
                  {`Delete ${tracker.slice(0, -1)}`}
                </div>
              </button>
            }
            {
              selectedItem !== "" &&
              <button 
                className="flex flex-row justify-center items-center rounded-xl bg-lightsilver ml-4 mt-5 py-2 px-3
                hover:bg-silver hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
                onClick={() => {setSelectedItem("");}}
              >
                <IconContext.Provider value={{color: "#ffffff", size: "1.6em"}}>
                  <VscChromeClose/>
                </IconContext.Provider>
                <div className="text-md text-white ml-2">
                  Deselect Item
                </div>
              </button>
            }
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