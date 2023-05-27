// React Icons
import { 
  VscAdd,
  VscChromeClose
} from 'react-icons/vsc';
import { IconContext, icons } from "react-icons";

// Auto-Resizable Input Import
import AutosizeInput from 'react-input-autosize';

// Custom imports
import { ErrorToaster } from '@/components/subcomponent/toasters';

// View functionality component definition
export function FreeAdd({ 
  itemList, 
  setItemList, 
  type, 
  fontSize="lg", 
  iconSize="1.3",
  padding="3",
  textColor="black"
}) {
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
    setItemList(newInputs, type);
  };

  // Update statuses on element delete
  const handleDeleteItem = (index) => {
    const newList = [...itemList];
    newList.splice(index, 1);
    setItemList(newList, type);
  };

  // Return the component
  return(
    <div className={`flex flex-wrap p-${padding}`}>
      {itemList.map((item, index) => (
        <div 
          className={`flex rounded-lg text-${fontSize} bg-lightgray m-1 p-1.5 w-auto`}
          key={index}
        >
          <AutosizeInput 
            type="text" 
            value={item}
            inputStyle={{ background: 'transparent' }}
            className={`text-${fontSize} text-poppins text-${textColor} placeholder-silver px-1 w-full`}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button onClick={() => {handleDeleteItem(index)}}>
            <IconContext.Provider value={{color: "#000000", size: `${iconSize}em`}}>
              <VscChromeClose/>
            </IconContext.Provider>
          </button>
        </div>
      ))}
      <button 
        className="flex flex-row justify-center border border-dashed border-bermuda items-center rounded-lg gap-1 m-1 p-1.5
         hover:-translate-y-[0.09rem] hover:drop-shadow-lg" 
        onClick={() => {setItemList([
          ...itemList, 
          `${type.charAt(0).toUpperCase() + type.slice(1)} #${itemList.length + 1}`
        ], type)}}
      >
        <IconContext.Provider value={{color: "#0DD9B5", size: `${iconSize}em`}}>
          <VscAdd/>
        </IconContext.Provider>
        <div className={`text-bermuda text-${fontSize}`}>
          {`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </div>
      </button>
    </div>
  )
}