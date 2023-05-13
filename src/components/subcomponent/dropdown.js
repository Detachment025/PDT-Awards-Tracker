// React Icons
import { 
	VscChevronUp,
	VscChevronDown
} from 'react-icons/vsc';

// React.js and Next.js libraries
import { useState } from 'react';

// Define bottom dropdown subcomponent
export function BottomDropDown({ listOfItems, setSelected }) {
  // Define variables
  const [innerElem, setInnerElem] = useState(listOfItems[0]);
  const [expanded, setExpanded] = useState(false);
  
  // Return definition of the dropdown subcomponent
  return(
    <div className="relative z-10 max-w-fit">
      <button 
        className="flex flex-row  text-lg rounded-lg shadow-inner border-2 gap-10 py-1 pl-4 pr-3 w-auto"
        onClick={() => {setExpanded(!expanded)}}
      >
        {innerElem}
        {(!expanded && <VscChevronUp size="1.5em"/>) || (expanded && <VscChevronDown size="1.5em"/>)}
      </button>
      {expanded && (
        <div className="absolute  bg-white rounded-lg shadow-inner border-2 w-full">
          {listOfItems.map(item => (
            <button 
              key={`${item.toLowerCase()}`} 
              onClick={() => {
                setSelected(item);
                setInnerElem(item)
                setExpanded(!expanded);
              }}
              className={
                `flex justify-start text-sm text-black rounded-lg px-4 w-full hover:bg-gray-100`
              }
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Define bottom dropdown subcomponent
export function TopDropDown({ listOfItems, setSelected }) {
  // Define variables
  const [innerElem, setInnerElem] = useState(listOfItems[0]);
  const [expanded, setExpanded] = useState(false);
  
  // Return definition of the dropdown subcomponent
  return(
    <div className="flex flex-col relative max-w-fit">
      {expanded && (
        <div className="absolute  bg-white rounded-lg shadow-inner border-2 w-full bottom-0 left-0 mb-10">
          {listOfItems.map(item => (
            <button 
              key={`${item.toLowerCase()}`} 
              onClick={() => {
                setSelected(item);
                setInnerElem(item)
                setExpanded(!expanded);
              }}
              className={
                `flex justify-start text-sm text-black rounded-lg px-4 w-full hover:bg-gray-100`
              }
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <button 
        className="flex flex-row  text-lg rounded-lg shadow-inner border-2 gap-10 py-1 pl-4 pr-3 z-10 w-auto"
        onClick={() => {setExpanded(!expanded)}}
      >
        {innerElem}
        {(!expanded && <VscChevronUp size="1.5em"/>) || (expanded && <VscChevronDown size="1.5em"/>)}
      </button>
    </div>
  );
}