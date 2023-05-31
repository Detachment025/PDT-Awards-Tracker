// React Icons
import { 
  VscAdd,
  VscPassFilled,
  VscError
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// Next.js and React.js Imports
import { useState } from "react";

// Date functionalities import
const moment = require('moment');

// Custom Imports
import { getData, toggleCompleted, updateStatusCategory } from '@/components/functionality/data';
import { Card } from '@/components/subcomponent/cards';
import { FreeAdd } from '@/components/subcomponent/freeadd';
import { Nothing } from '@/components/functionality/nothing';
import { config } from '@/config/config';

// Summary Card definition
export function SummaryCard ({ itemName, term, tracker }) {
  // Create a useState for the data
  const [completed, setCompleted] = useState(getData()[tracker][itemName]["tags"]["completed"]); 
  const [data, setData] = useState(getData()[tracker][itemName]); 

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
  const changeInfo = (changes, statusCategory) => {
    // Copy the data
    var clone = { ...data };

    // Update the clone's data
    clone["terms"][relativeToAbsoluteYear(term)][statusCategory] = changes;

    // Update the data
    updateStatusCategory(
      tracker,
      itemName,
      relativeToAbsoluteYear(term).toString(),
      statusCategory,
      changes
    );
    setData(clone);
  }

  // Get the difference between the primary and secondary list
  const getDiff = (primary, secondary) => {
    if (primary)
      return (primary.filter(item => !secondary.includes(item)))
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

    // Update the data
    setData(clone);
  };

  // Render component
  return (
    <div className="text-left shadow-md rounded-lg border-2 p-2 mb-3">
      <div className="flex flex-row text-2xl items-center gap-3">
        <div className="flex flex-row text-2xl items-center gap-1">
          {
            <button 
              onClick={() => {toggleCompleted(tracker, itemName, setCompleted)}} 
              className={completed ? "text-bermuda" : "text-scarlet"}
            >
              <IconContext.Provider value={{size: "1.2em"}}>
                {completed ? <VscPassFilled/> : <VscError/>}
              </IconContext.Provider>
            </button>
          }
          {itemName}
        </div>
        <div className="flex flex-row text-2xl items-center gap-2">
          {data["tags"]["jnac"] && <Card text={"JNAC"} size={"sm"} pad={0.5} bg={"bermuda"} textColor="white"/>}
          {data["tags"]["usafa"] && <Card text={"USAFA"} size={"sm"} pad={0.5} bg={"malibu"} textColor="white"/>}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {data["statusCategories"].map((item, index) => (
          <div className="flex-1 flex flex-col" key={`statusCat-${index}`}>
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
                <>
                  <FreeAdd
                    itemList={data["terms"][relativeToAbsoluteYear(term)][item]}
                    setItemList={(item, category) => {changeInfo(item, category)}}
                    type={item}
                    fontSize="sm"
                    iconSize="1.5"
                    spanFullWidth={true}
                    dropDown={config[tracker]["key"] === item}
                    padding="0.5"
                    additionalList={
                      getDiff(
                        data["terms"][relativeToAbsoluteYear(term)][
                          Object.keys(data["terms"][relativeToAbsoluteYear(term)])[index+1]
                        ], 
                        data["terms"][relativeToAbsoluteYear(term)][
                          Object.keys(data["terms"][relativeToAbsoluteYear(term)])[index]
                        ]
                      )
                    }
                  />
                </>
                
            }
          </div>))
        }
        <div className="flex-1 flex flex-col">
          Previously {config[tracker]["key"].charAt(0).toUpperCase() + config[tracker]["key"].slice(1)}
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
                  <tr key={`year-${item}`}>
                    <td className="align-top text-left text-xl w-1/12" style={{ whiteSpace: 'nowrap' }}>
                      {`${absoluteToRelativeYear(item)} (${item}):`}
                    </td>
                    {
                      Object.keys(data["terms"]).includes(item.toString()) ?
                        <td className="flex pl-2">
                          {
                            data["terms"][item][config[tracker]["key"]].length !== 0 ?
                              <div className="flex flex-row flex-wrap text-darkbermuda gap-1">
                                {data["terms"][item][config[tracker]["key"]].map(statusItem => (
                                  <div className="text-white bg-bermuda rounded-lg py-0.5 px-1" key={`key-${statusItem}`}>
                                    {statusItem}
                                  </div>
                                ))}
                              </div>
                            :
                              <div className="text-white bg-scarlet rounded-lg py-0.5 px-1 w-fit">
                                No One {config[tracker]["key"].charAt(0).toUpperCase() + config[tracker]["key"].slice(1)}
                              </div>
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