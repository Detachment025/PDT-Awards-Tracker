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

// Custom imports
import { ButtonCard } from '@/components/subcomponent/cards';
import { FreeAdd } from '@/components/subcomponent/freeadd';
import Nothing from '@/components/subcomponent/nothing';

// View functionality component definition
export default function EditComponent({ tracker, incomingData }) {
  // Define useStates
  const [selectedItem, setSelectedItem] = useState();
  const [selectedData, setSelectedData] = useState();
  const [selectedStatusCategories, setSelectedStatusCategories] = useState([]);

  // Create a router
  const router = useRouter();

  // Set the selectedStatusCategories on change of the selectedItem
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()];
    if (selectedItem !== undefined && Object.keys(data).length !== 0) {
      console.log(data[selectedItem])
      setSelectedData(data[selectedItem]);
      setSelectedStatusCategories(
        data[selectedItem]["statusCategories"]
      );
    }
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
              value={(selectedData === undefined) ? null : selectedData["initARMS"]["day"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
            <input 
              id="ARMSMonth" 
              maxLength="2"
              placeholder="MM"
              value={(selectedData === undefined) ? null : selectedData["initARMS"]["month"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
            <input 
              id="ARMSYear" 
              maxLength="4"
              placeholder="YYYY"
              value={(selectedData === undefined) ? null : selectedData["initARMS"]["year"]}
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
              value={(selectedData === undefined) ? null : selectedData["rosterDOT"]["day"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
            <input 
              id="DOTMonth" 
              maxLength="2"
              placeholder="MM"
              value={(selectedData === undefined) ? null : selectedData["rosterDOT"]["month"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[2.4em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
            <input 
              id="DOTYear" 
              maxLength="4"
              placeholder="YYYY"
              value={(selectedData === undefined) ? null : selectedData["rosterDOT"]["year"]}
              className="text-lg text-poppins rounded-lg shadow-inner border-2 px-1 focus:border-black shadow-inner w-[3.1em]"
              onKeyDown={(event) => (!/[0-9]/.test(event.key) && !(event.key == "Backspace") && !(event.key == "Delete")) && event.preventDefault()}
            />
          </div>
        </div>

        <div className="flex-shrink-0 flex w-full">
          <button 
            className="flex flex-row justify-center items-center rounded-xl bg-bermuda mt-5 py-2 px-3
            hover:bg-darkbermuda hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
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
          !(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length !== 0) ? 
          <Nothing mainText={`No ${tracker}`} subText={addButton}/> 
          : 
          listAwardsOrPDTs
        }
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className=" text-4xl mb-3"> 
          {(selectedItem !== undefined) ? `Edit ${selectedItem}` : `Edit ${tracker.slice(0, -1)}`} 
        </div>
        {
          !(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length !== 0) ? 
          <Nothing mainText={`No ${tracker}`} subText={addButton}/> 
          : 
          (!selectedItem ? <Nothing mainText={`No ${tracker.slice(0, -1)} Selected`} subText={"Select One!"}/> : editPanel)
        }
      </div>
    </div>    
  )

}