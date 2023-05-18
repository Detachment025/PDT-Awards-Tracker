// React Icons
import { 
  VscAdd,
  VscChromeClose
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// Custom imports
import { TopDropDown, BottomDropDown } from './dropdown';
import { ErrorToaster } from '@/components/functionality/toasters';
import { useState } from 'react';

// View functionality component definition
export function FreeAdd({ itemList, setItemList, type }) {
  // Handle change of the input field's content
  const handleInputChange = (index, value) => {
    // Check if the value is in the list
    if (itemList.includes(value)) {
      // Send error message and return
      ErrorToaster(`"${value}" ${type} already exists`);
      return;
    }

    // Update statuses
    const newInputs = [...itemList];
    newInputs[index] = value;
    setItemList(newInputs);
  };

  // Update statuses on element delete
  const handleDeleteItem = (index) => {
    const newList = [...itemList];
    newList.splice(index, 1);
    setItemList(newList);
  };

  // Return the component
  return(
    <div className="flex flex-wrap p-3">
      {itemList.map((item, index) => (
        <div 
          className="flex rounded-lg text-lg bg-lightgray m-1 py-2 px-2 w-[11.7rem]" 
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
        </div>
      ))}
      <button 
        className="rounded-lg bg-bermuda m-1 py-2 px-2 flex flex-row justify-center items-center
        hover:bg-darkbermuda hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
        onClick={() => {setItemList([
          ...itemList, 
          `${type.charAt(0).toUpperCase() + type.slice(1)} #${itemList.length + 1}`
        ])}}
      >
        <IconContext.Provider value={{color: "#ffffff", size: "1.3em"}}>
          <VscAdd/>
        </IconContext.Provider>
        <div className="ml-1 text-white text-lg">
          {`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </div>
      </button>
    </div>
  )
}

// View functionality component definition
export function FreeAddListWithDropdown({ itemList, setItemList, type }) {
  // Handle change of the input field's content
  const handleInputChange = (index, value) => {
    // Check if the value is in the list
    if (itemList.includes(value)) {
      // Send error message and return
      ErrorToaster(`"${value}" ${type} already exists`);
      return;
    }

    // Update statuses
    const newInputs = [...itemList];
    newInputs[index] = value;
    setItemList(newInputs);
  };

  // Update statuses on element delete
  const handleDeleteItem = (index) => {
    const newList = [...itemList];
    newList.splice(index, 1);
    setItemList(newList);
  };

  // Return the component
  const [list, SetList] = useState(["Test 1", "Test 2", "Test 3"]);
  const [selected, setSelected] = useState();
  return(
    <div className="flex flex-col gap-2 p-3">
      {itemList.map((item, index) => (
        <button 
          className="flex justify-between rounded-lg text-lg bg-lightgray py-2 px-2 w-full" 
          key={index}
        >
          <BottomDropDown
            listOfItems={list}
            setSelected={setSelected}
            z={itemList.length - index}
          />
          <button onClick={() => {handleDeleteItem(index)}}>
            <IconContext.Provider value={{color: "#000000", size: "1.3em"}}>
              <VscChromeClose/>
            </IconContext.Provider>
          </button>
        </button>
      ))}
      <button 
        className="rounded-lg bg-bermuda py-2 px-2 flex flex-row justify-center items-center
        hover:bg-darkbermuda hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
        onClick={() => {setItemList([
          ...itemList, 
          `${type.charAt(0).toUpperCase() + type.slice(1)} #${itemList.length + 1}`
        ])}}
      >
        <IconContext.Provider value={{color: "#ffffff", size: "1.3em"}}>
          <VscAdd/>
        </IconContext.Provider>
        <div className="ml-1 text-white text-lg">
          {`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </div>
      </button>
    </div>
  )
}