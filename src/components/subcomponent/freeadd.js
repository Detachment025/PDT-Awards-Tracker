// React Icons
import { 
  VscAdd,
  VscChromeClose,
  VscCheck,
  VscTrash
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// Auto-Resizable Input Import
import AutosizeInput from 'react-input-autosize';

// Custom imports
import { ErrorToaster } from '@/components/subcomponent/toasters';
import { BottomDropDown } from './dropdown';

// React.js and Next.js libraries
import { useState } from 'react';

// View functionality component definition
export function FreeAdd({ 
  itemList, 
  setItemList, 
  type, 
  fontSize="lg", 
  iconSize="1.2",
  padding="",
  textColor="black",
  spanFullWidth=false,
  dropDown=false,
  unremovable=[],
  additionalList=[]
}) {
  // Initialization of useState(s)
  const [index, setIndex] = useState(-1);

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

  // Confirmation selection content
  const confirmationSelection = (
    <div className="flex flex-row gap-1">
      {
        spanFullWidth ? 
          <>
            <button onClick={() => {handleDeleteItem(index); setIndex(-1)}}>
              <IconContext.Provider value={{color: "#000000", size: `${iconSize}em`}}>
                <VscCheck/>
              </IconContext.Provider>
            </button>
            <button onClick={() => {setIndex(-1)}}>
              <IconContext.Provider value={{color: "#000000", size: `${iconSize}em`}}>
                <VscChromeClose/>
              </IconContext.Provider>
            </button>
          </>
        :
          <>
            <button onClick={() => {setIndex(-1)}}>
              <IconContext.Provider value={{color: "#000000", size: `${iconSize}em`}}>
                <VscChromeClose/>
              </IconContext.Provider>
            </button>
            <button onClick={() => {handleDeleteItem(index); setIndex(-1)}}>
              <IconContext.Provider value={{color: "#000000", size: `${iconSize}em`}}>
                <VscCheck/>
              </IconContext.Provider>
            </button>
          </>
      }
    </div>
  )

  // Return the component
  return(
    <div className={`flex flex-wrap p-${padding} gap-2 w-${spanFullWidth ? "full" : "auto"}`}>
      {itemList.map((item, idx) => (
        <div 
          className={`flex rounded-lg text-${fontSize} bg-lightgray items-center gap-0.5 p-1 w-${spanFullWidth ? "full" : "auto"}`}
          key={idx}
        >
          {
            spanFullWidth ?
              (
                dropDown ?
                  <BottomDropDown
                    listOfItems={additionalList}
                    setSelected={(e) => {handleInputChange(idx, e)}}
                    defaultValue={item}
                    bgColor="lightgray"
                    widthType="full"
                    z="999"
                  /> 
                :
                  <input 
                    type="text" 
                    value={item}
                    style={{ background: 'transparent' }}
                    className={`text-${fontSize} text-poppins text-${textColor} bg-transparent placeholder-silver px-1 w-full`}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                  />
              )
              
            :
              <AutosizeInput 
                type="text" 
                value={item}
                inputStyle={{ background: 'transparent' }}
                className={`text-${fontSize} text-poppins text-${textColor} placeholder-silver px-1 w-full`}
                onChange={(e) => handleInputChange(idx, e.target.value)}
              />
          }
          {
            unremovable.includes(item) ? 
              <></> 
            : 
              (
                !(index == idx) ?
                  <button onClick={() => {setIndex(idx)}}>
                    <IconContext.Provider value={{color: "#000000", size: `${iconSize}em`}}>
                      <VscTrash/>
                    </IconContext.Provider>
                  </button>
                :
                  confirmationSelection
              )
          }
        </div>
      ))}
      <button 
        className={`flex flex-row justify-center border-2 border-dashed border-bermuda items-center rounded-lg gap-1 px-1 w-${spanFullWidth ? "full" : "auto"}
         hover:-translate-y-[0.09rem] hover:drop-shadow-lg`} 
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