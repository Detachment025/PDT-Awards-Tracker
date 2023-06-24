// React Icons
import {
	VscChevronUp,
	VscChevronDown
} from 'react-icons/vsc';

// React.js and Next.js libraries
import { useState } from 'react';

// Define bottom dropdown subcomponent
export function BottomDropDown({
  listOfItems,
  setSelected,
  bgColor="white",
  headSize="md",
  widthType="fit",
  defaultValue=null
}) {
  // Define variables
  const [innerElem, setInnerElem] = useState(listOfItems[0]);
  const [expanded, setExpanded] = useState(false);

  // Return definition of the dropdown subcomponent
  return(
    <div className={`relative w-${widthType}`}>
      <button
        className={`flex flex-row justify-between bg-${bgColor} text-${headSize} rounded-lg shadow-inner border-2 gap-10 py-0.5 px-1.5 w-full`}
        onClick={() => {setExpanded(!expanded)}}
      >
        {defaultValue !== null ? defaultValue : innerElem}
        {(!expanded && <VscChevronDown size="1.5em"/>) || (expanded && <VscChevronUp size="1.5em"/>)}
      </button>
      {expanded && (
        <div className={`absolute bg-${bgColor} rounded-lg shadow-inner border-2 w-full z-[999]`}>
          {listOfItems.map(item => (
            <button
              key={item}
              onClick={() => {
                setSelected(item);
                setInnerElem(item)
                setExpanded(!expanded);
              }}
              className={
                `flex justify-start text-sm text-black rounded-lg px-1.5 w-full hover:bg-gray-100`
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
export function TopDropDown({
  listOfItems,
  setSelected,
  bgColor="white",
  headSize="md",
  widthType="fit",
  defaultValue=null
}) {
  // Define variables
  const [innerElem, setInnerElem] = useState(listOfItems[0]);
  const [expanded, setExpanded] = useState(false);

  // Return definition of the dropdown subcomponent
  return(
    <div className={`flex flex-col relative w-${widthType}`}>
      {expanded && (
        <div className={`absolute bg-${bgColor} rounded-lg shadow-inner border-2 w-full bottom-0 left-0 mb-10 z-[999]`}>
          {listOfItems.map(item => (
            <button
              key={item}
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
        className={`flex flex-row justify-between bg-${bgColor} text-${headSize} rounded-lg shadow-inner border-2 gap-10 py-0.5 px-1.5 w-full`}
        onClick={() => {setExpanded(!expanded)}}
      >
        {defaultValue !== null ? defaultValue : innerElem}
        {(!expanded && <VscChevronUp size="1.5em"/>) || (expanded && <VscChevronDown size="1.5em"/>)}
      </button>
    </div>
  );
}