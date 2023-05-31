// React Icons
import { 
  VscAdd,
  VscSave,
  VscRefresh,
  VscTrash,
  VscChromeClose
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useState, useEffect } from 'react';

// Date functionalities import
const moment = require('moment');

// Custom imports
import CheckboxComponent from '@/components/subcomponent/checkbox';
import { getData, addItem, updateItem, deleteItem } from '@/components/functionality/data';
import { ErrorToaster, SuccessToaster } from '@/components/subcomponent/toasters';
import { ButtonCard } from '@/components/subcomponent/cards';
import { Nothing } from '@/components/functionality/nothing';
import { FreeAdd } from '@/components/subcomponent/freeadd';
import { config } from '@/config/config';

// View functionality component definition
export default function AddEditComponent({ tracker }) {
  // Variable declaration
  const [statusList, setStatusList] = useState(config[tracker.toLowerCase()]["defaultStatusCategories"]);
  const [usafa, setUSAFA] = useState(false);
  const [jnac, setJNAC] = useState(false);
  const [presence, setPresence] = useState(Object.keys(getData()[tracker.toLowerCase()]).length);
  const [selectedItem, setSelectedItem] = useState("");

  // Set the defaults for the selected list on 
  useEffect(() => {
    setPresence(Object.keys(getData()[tracker.toLowerCase()]).length);
    setStatusList(config[tracker.toLowerCase()]["defaultStatusCategories"]);
  }, [tracker])

  // Set the selectedStatusCategories on change of the selectedItem
  useEffect(() => {
    // Get current data
    const data = getData()[tracker.toLowerCase()];

    // Check if an item has been selected and set other useStates if need be
    if (selectedItem !== "" && Object.keys(data).length !== 0) {
      setStatusList(data[selectedItem]["statusCategories"]);
      populateFields();
    } 
  }, [selectedItem]);

  // List Awards or PDTs
  const listAwardsOrPDTs = (
    <div 
      className="flex flex-col h-full overflow-y-scroll"
    >
      {Object.keys(getData()[tracker.toLowerCase()]).map((item) => (
        <ButtonCard key={item} text={item} size={"2xl"} setSelected={setSelectedItem}/>
      ))}
    </div>
  )

  // Handle Wiping the contents of the fields
  const handleReset = () => {
    document.getElementById("name").value = "";
    document.getElementById("ARMSMonth").value = "08";
    document.getElementById("ARMSYear").value = moment().year();
    document.getElementById("DOTMonth").value = "";
    document.getElementById("DOTYear").value = "";
    setUSAFA(false);
    setJNAC(false);
    setStatusList(config[tracker.toLowerCase()]["defaultStatusCategories"]);
  };

  // Handle the population of the input fields
  const populateFields = () => {
    document.getElementById("name").value = selectedItem;
    document.getElementById("ARMSMonth").value = getData()[tracker.toLowerCase()][selectedItem]["initARMS"]["month"];
    document.getElementById("ARMSYear").value = getData()[tracker.toLowerCase()][selectedItem]["initARMS"]["year"];
    document.getElementById("DOTMonth").value = getData()[tracker.toLowerCase()][selectedItem]["rosterDOT"]["month"];
    document.getElementById("DOTYear").value = getData()[tracker.toLowerCase()][selectedItem]["rosterDOT"]["year"];
    setUSAFA(getData()[tracker.toLowerCase()][selectedItem]["tags"]["usafa"]);
    setJNAC(getData()[tracker.toLowerCase()][selectedItem]["tags"]["jnac"]);
    setStatusList(getData()[tracker.toLowerCase()][selectedItem]["statusCategories"]);
  }

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

    // Check if the Award or PDT being added already exists.
    // If so, create an error message and return
    if (Object.keys(getData()[tracker.toLowerCase()]).includes(name) && selectedItem === "") {
      ErrorToaster(`"${name}" ${tracker.slice(0, -1)} already exists`)
      return;
    }

    // Set up variables for the all-or-nothing condition on all inputs for the ARMS field
    const armsMonth = document.getElementById("ARMSMonth").value === "";
    const armsYear = document.getElementById("ARMSYear").value === "";

    // Check if the inputs are aligned. If so, create an error message and return
    if (armsMonth && armsYear) {
      ErrorToaster("Expected initial ARMS field needs to be fully filled")
      return;  
    }
    
    // Proceed to check the date validity of the given inputs
    // If so, create an error message and return
    if(!moment("25-" + document.getElementById("ARMSMonth").value
      + "-" + document.getElementById("ARMSYear").value, "D-M-YYYY", true).isValid() 
      && !(armsMonth && armsYear)
    ) {
      ErrorToaster("Expected initial ARMS field has incorrect date inputted")
      return;  
    }

    // Set up variables for the all-or-nothing condition on all inputs for the ARMS field
    const dotMonth = document.getElementById("DOTMonth").value === "";
    const dotYear = document.getElementById("DOTYear").value === "";

    // Check if the inputs are aligned. If so, create an error message and return
    if (!((dotMonth && dotYear) || (!dotMonth && !dotYear))) {
      ErrorToaster("Expected roster to DOT field needs to be fully filled or empty")
      return;  
    }
    
    // Proceed to check the date validity of the given inputs
    // If so, create an error message and return
    if(!moment("25-" + document.getElementById("DOTMonth").value 
      + "-" + document.getElementById("DOTYear").value, "D-M-YYYY", true).isValid()
      && !(dotMonth && dotYear)
    ) {
      ErrorToaster("Expected roster to DOT field has incorrect date inputted")
      return;  
    }

    // Add item
    if (selectedItem === "") {
      addItem(tracker, name, statusList, usafa, jnac, document);
      setPresence(presence + 1);
    // Update Item
    } else {
      updateItem(tracker, name, statusList, usafa, jnac, selectedItem, document);
    }
    
    // Empty selected item, reset list, and send toaster message
    setSelectedItem("");
    handleReset();
    SuccessToaster(`"${name}" ${tracker.slice(0, -1)} successfully ${selectedItem === "" ? "created" : "updated"}`);

    // <!> DEBUG <!>
    console.log(getData())
  }

  // Handle the deletion of an item
  const handleDeleteItem = () => {
    // Delete and Add Award or PDT to the data
    deleteItem(tracker.toLowerCase(), selectedItem)

    // Set useStates
    setPresence(presence - 1);
    setSelectedItem("");

    // Clear inputs and send success toasters
    handleReset();
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
              className="text-xl border-2 rounded-lg h-auto px-1 focus:border-black shadow-inner"
              onKeyDown={handleEnterPress}
            />
          </div>

          <div className="flex-1 flex flex-col h-1/2 gap-1">
            <div className="text-2xl">
              Status Categories: 
            </div>
            <div className="border-2 h-full rounded-lg shadow-inner p-3">
              <FreeAdd
                itemList={statusList}
                setItemList={(item, _) => {setStatusList(item)}}
                type="status"
                unremovable={
                  (config[tracker.toLowerCase()]["defaultStatusCategoriesUnremovable"]) ?
                    config[tracker.toLowerCase()]["defaultStatusCategories"]
                  :
                    []
                }
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="text-2xl">
              Tags
            </div>
            <div className="flex flex-row gap-7">
              <div className="flex flex-row gap-2">
                <CheckboxComponent name="usafa" state={usafa} setState={setUSAFA}/>
                <div className="text-xl">
                  USAFA
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <CheckboxComponent name="jnac" state={jnac} setState={setJNAC}/>
                <div className="text-xl">
                  JNAC
                </div>
              </div>
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

          <div className="flex-shrink-0 flex w-full gap-3">
            <button 
              className="flex flex-row justify-center items-center rounded-xl bg-bermuda mt-5 py-2 px-3 gap-1.5
              hover:bg-darkbermuda hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
              onClick={() => {addEditAwardOrPDT()}}
            >
              <IconContext.Provider value={{color: "#ffffff", size: "1.2em"}}>
                {selectedItem === "" ? <VscAdd/> : <VscSave/>}
              </IconContext.Provider>
              <div className="text-md text-white">
                {selectedItem === "" ? `Add ${tracker.slice(0, -1)}` : `Save Changes`}
              </div>
            </button>
            <button 
              className="flex flex-row justify-center items-center rounded-xl bg-malibu mt-5 py-2 px-3 gap-1.5
              hover:bg-darkmalibu hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
              onClick={() => {selectedItem === "" ? handleReset() : populateFields()}}
            >
              <IconContext.Provider value={{color: "#ffffff", size: "1.2em"}}>
                <VscRefresh/>
              </IconContext.Provider>
              <div className="text-md text-white">
              {selectedItem === "" ? `Reset` : `Undo Changes`}
              </div>
            </button>
            {
              selectedItem !== "" &&
              <button 
                className="flex flex-row justify-center items-center rounded-xl bg-scarlet mt-5 py-2 px-3 gap-1.5
                hover:bg-darkscarlet hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
                onClick={() => {handleDeleteItem()}}
              >
                <IconContext.Provider value={{color: "#ffffff", size: "1.2em"}}>
                  <VscTrash/>
                </IconContext.Provider>
                <div className="text-md text-white">
                  {`Delete ${tracker.slice(0, -1)}`}
                </div>
              </button>
            }
            {
              selectedItem !== "" &&
              <button 
                className="flex flex-row justify-center items-center rounded-xl bg-lightsilver mt-5 py-2 px-3 gap-1.5
                hover:bg-silver hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
                onClick={() => {setSelectedItem(""); handleReset()}}
              >
                <IconContext.Provider value={{color: "#ffffff", size: "1.2em"}}>
                  <VscChromeClose/>
                </IconContext.Provider>
                <div className="text-md text-white">
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
          <Nothing
            mainText={`No Data Recorded`}
            subText={`Add Some!`}
          /> 
          : 
          listAwardsOrPDTs
        }
      </div>
    </div>
  );
}