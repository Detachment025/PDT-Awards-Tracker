// React Icons
import { 
  VscAdd 
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// Custom imports
import { BottomDropDown } from '@/components/subcomponent/dropdown';
import { Nothing } from '@/components/functionality/nothing';
import { StatCard } from '@/components/subcomponent/cards';
import { getData } from '@/components/functionality/data';
import { SummaryCard } from './card';

// React.js and Next.js libraries
import { useState } from "react";
import { useRouter } from 'next/router';

// Date functionalities import
const moment = require('moment');

// View functionality component definition
export default function OverviewComponent({ tracker, incomingData }) {
  // Set useStates and variables
  const [term, setTerm] = useState("CY");
  const listOfYears = Array.from(
    { length: 19 }, (_, i) => (i === 0 ? `CY (${moment().year() - i})` : `CY-${i} (${moment().year() - i})`)
  );
  var listOfItems = Object.keys(getData()[tracker.toLowerCase()]);

  // Create a router
  const router = useRouter();

  // Sort the listOfItems
  listOfItems.sort((a, b) => {
    // Get the root data
    const root = JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()];

    // Sort by completed tag, pushing completed items to end
    if (root[a].tags.jnac && !root[b].tags.completed) return 1;
    if (!root[a].tags.jnac && root[b].tags.completed) return -1;

    // Sort by presence of JNAC tag first
    if (root[a].tags.jnac && !root[b].tags.jnac) return -1;
    if (!root[a].tags.jnac && root[b].tags.jnac) return 1;

    // Sort by presence of USAFA tag first
    if (root[a].tags.usafa && !root[b].tags.usafa) return -1;
    if (!root[a].tags.usafa && root[b].tags.usafa) return 1;

    // Then sort by initialization date
    let dateA = moment(`${root[a].initARMS.month}-${root[a].initARMS.year}`, 'MM-YYYY').toDate()
    let dateB = moment(`${root[b].initARMS.month}-${root[b].initARMS.year}`, 'MM-YYYY').toDate();
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    // Finally sort by name
    if (a < b) return -1;
    if (a > b) return 1;
  })

  // No Data Recorded sub-component
  const NoDataRecorded = (
    <Nothing
      mainText={`No Data Recorded`}
      subText={
        <div className="flex text-md items-center justify-center">
          <button 
            className="flex items-center justify-center bg-scarlet text-md px-2 py-[0.01rem] mr-1 rounded-lg text-white 
            hover:bg-darkscarlet hover:-translate-y-[0.07rem] hover:drop-shadow-lg"
            onClick={() => {router.push("/add_edit")}}
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
    }
    />
  );

  // Summary list sub-component
  const summaryList = (
    <div 
      className="flex flex-col h-full"
    >
      {listOfItems.map((item) => (
        <SummaryCard 
          key={item} 
          itemName={item}
          term={term}
          tracker={tracker.toLowerCase()}
        />
      ))}
    </div>
  );

  // Stats list sub-component
  const statsList = (
    <div>
      <StatCard
        keyText={`Number of ${tracker}`}
        valueText={listOfItems.length}
      />
    </div>
  )

  // Render the View functionality component 
  return(
    <div className="flex-1 flex-row h-full overflow-y-hidden">
      <div className="flex gap-6 h-full">
        <div className="flex flex-col w-9/12 h-full">
          <div className="flex flex-row items-center mb-3 gap-2">
            <div className="text-4xl mr-1">
              Summary for 
            </div>
            <div className='z-[1234]'>
              <BottomDropDown
                listOfItems={listOfYears}
                setSelected={setTerm}
                headSize="xl"
              />
            </div>
          </div>
          <div className="flex-1 h-screen overflow-y-scroll pr-1">
            {(Object.keys(incomingData).length === 0) ? NoDataRecorded : summaryList}
          </div>
        </div>
        <div className="flex-1 flex flex-col h-full">
          <div className=" text-4xl mb-3">
            Stats 
          </div>
          <div className="flex-1">
            {(Object.keys(incomingData).length === 0) ? NoDataRecorded : statsList}
          </div>
        </div>
      </div>
    </div>
  );
}