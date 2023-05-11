// React Icons
import { 
  VscAdd,
  VscChromeClose
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// Custom imports
import { ErrorToaster } from '@/components/toasters';

// View functionality component definition
export default function FreeAdd({ itemList, setItemList, type }) {
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
    <ul className="flex flex-wrap p-3">
      {itemList.map((item, index) => (
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
        onClick={() => {setItemList([...itemList, `Status #${itemList.length + 1}`])}}
      >
        <IconContext.Provider value={{color: "#ffffff", size: "1.3em"}}>
          <VscAdd/>
        </IconContext.Provider>
        <div className="ml-1 text-white text-lg">
          Add Status
        </div>
      </button>
    </ul>
  )
}