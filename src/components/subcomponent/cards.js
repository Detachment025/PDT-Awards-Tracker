// React Icons
import { 
  VscError,
  VscAdd 
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// Next.js and React.js Imports
import { useEffect, useState } from "react";

// Date functionalities import
const moment = require('moment');

// Custom Imports
import { FreeAdd, ListAddDropDown } from "./freeadd";
import { Nothing } from "../functionality/nothing";
import { config } from '@/config/config';

// Regular Card definition
export function Card ({ text, size }) {
  // Render component
  return (
    <div className="text-left shadow-md rounded-lg border-2 p-2 mb-3" key={text}>
      <div className={`text-${size}`}>
        {text}
      </div>
    </div>
  );
}

// Key Value Card definition
export function StatCard ({ keyText, valueText }) {
  // Render component
  return (
    <div className="text-left shadow-md rounded-lg border-2 px-4 py-5" key={keyText}>
      <div className="text-2xl">
        {keyText}
      </div>
      <div className="text-5xl text-darkbermuda mt-3">
        {valueText}
      </div>
    </div>
  );
}

// Button Card definition
export function ButtonCard ({ text, size, setSelected }) {
  // Render component
  return (
    <button 
      className="text-left shadow-md rounded-lg border-2 p-1.5 mb-3" 
      key={text}
      onClick={() => setSelected(text)}
    >
      <div className={`text-${size}`}>
        {text}
      </div>
    </button>
  );
}

// Summary Card definition
export function SummaryCard ({ incomingData, term, tracker }) {
  // Create a useState for the data
  const [data, setData] = useState(incomingData); 

  // Function to map term to year
  const relativeToAbsoluteYear = (year) => {
    // Get current year
    const currentYear = moment().year()

    // Parse delta
    const delta = parseInt(year.replace("CY-", ""));

    // Return the absolute year
    return(currentYear - (isNaN(delta) ? 0 : delta ));
  }

  // Function to map term to year
  const absoluteToRelativeYear = (year) => {
    // Get current year
    const currentYear = moment().year()

    // Parse delta
    const delta = currentYear - year

    // Return the absolute year
    return("CY-" + delta);
  }

  // Create a setData wrapper that enhances the 
  // functionality of the setData function
  const changeInfo = (changes, type) => {
    // Copy the data
    var clone = { ...data };

    // Update the clone's data
    clone["terms"][relativeToAbsoluteYear(term)][type] = changes;

    // Update the data
    setData(clone);
  }

  // Make new data if the current term is not on record
  if (!Object.keys(data["terms"]).includes(relativeToAbsoluteYear(term).toString())) {
    // Copy the data
    var clone = { ...data };

    // Update the clone's data
    clone["terms"][relativeToAbsoluteYear(term).toString()] = clone["statusCategories"].reduce((cat, key, index) => {
      cat[key] = [];
      return cat
    }, {});

    console.log(clone)

    // Update the data
    setData(clone);
  };

  // Render component
  return (
    <div className="text-left shadow-md rounded-lg border-2 p-2 mb-3">
      <div className="text-2xl">
        {incomingData["id"]}
      </div>
      <div className="flex flex-row gap-2">
        {data["statusCategories"].map((item, index) => (
          <div className="flex-1 flex flex-col" key={index}>
            {item}
            {
              data["terms"][relativeToAbsoluteYear(term)][item].length === 0 ? 
                <Nothing
                  mainText={`No One ${item}`}
                  subText={
                    <div className="flex text-md items-center justify-center">
                      <button 
                        className="flex items-center justify-center bg-scarlet text-md px-2 py-[0.01rem] mr-1 rounded-lg text-white 
                        hover:bg-darkscarlet hover:-translate-y-[0.07rem] hover:drop-shadow-lg"
                        onClick={() => {
                          changeInfo([`${item} #1`], item)
                        }}
                      >
                        <IconContext.Provider value={{size: "1em", className: "mr-1"}}>
                          <VscAdd/>
                        </IconContext.Provider>
                        Add
                      </button>
                    </div>
                  }
                />
              :
                (
                  config[tracker]["key"] === item ?
                    <FreeAdd
                      itemList={data["terms"][relativeToAbsoluteYear(term)][item]}
                      setItemList={(item, type) => {changeInfo(item, type)}}
                      type={item}
                      fontSize="sm"
                      iconSize="1.5"
                      spanFullWidth={true}
                      dropDown={true}
                      padding="0.5"
                    />
                  :
                    <FreeAdd
                      itemList={data["terms"][relativeToAbsoluteYear(term)][item]}
                      setItemList={(item, type) => {changeInfo(item, type)}}
                      type={item}
                      fontSize="sm"
                      iconSize="1.5"
                      spanFullWidth={true}
                      padding="0.5"
                    />
                )
            }
          </div>))
        }
        <div className="flex-1 flex flex-col">
          Previously Awarded
          <table className="border-spacing-1 h-full min-w-full ">
            <thead style={{ display: 'none' }}>
              <tr>
                <th className="text-clip">CY</th>
                <th>List of People</th>
              </tr>
            </thead>
            <tbody className="justify-between">
              {
                Array.from({ length: 4 }, (_, i) => relativeToAbsoluteYear(term) - (i + 1)).map(item => (
                  <tr key={item}>
                    <td className="align-top text-left text-xl w-1/12" style={{ whiteSpace: 'nowrap' }}>
                      {`${absoluteToRelativeYear(item)} (${item}):`}
                    </td>
                    {
                      Object.keys(data["terms"]).includes(item.toString()) ?
                        <td className="flex pl-2">
                          {
                            data["terms"][item]["Awarded"].length !== 0 ?
                              <div className="flex flex-row flex-wrap text-darkbermuda gap-1">
                                {data["terms"][item]["Awarded"].map(awardee => (
                                  <div className="text-white bg-bermuda rounded-lg py-0.5 px-1">
                                    {awardee}
                                  </div>
                                ))}
                              </div>
                              :
                              <div className="text-white bg-scarlet rounded-lg py-0.5 px-1 w-fit">No One Awarded</div>
                          }
                        </td>
                      :
                        <td className="flex pl-2">
                          <div className="text-scarlet pt-0.5">No Data Recorded</div>
                        </td>    
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// (
//   config[tracker]["key"] === item ?
//     <ListAddDropDown
//       itemList={data["terms"][relativeToAbsoluteYear(term)][item]}
//       setItemList={(item, type) => {changeInfo(item, type)}}
//       type={item}
//       fontSize="sm"
//       iconSize="1.4"
//       padding="0.5"
//       additionalList={}
//     />
//   :
//     <FreeAdd
//       itemList={data["terms"][relativeToAbsoluteYear(term)][item]}
//       setItemList={(item, type) => {changeInfo(item, type)}}
//       type={item}
//       fontSize="sm"
//       iconSize="1.5"
//       padding="0.5"
//     />
// )