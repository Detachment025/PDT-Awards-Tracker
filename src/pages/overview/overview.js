// React Icons
import { 
  VscError,
  VscAdd 
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

// Date functionalities import
const moment = require('moment');

// Custom imports
import { SummaryCard, StatCard } from '@/components/subcomponent/cards';
import { BottomDropDown } from '@/components/subcomponent/dropdown';
import { Nothing } from '@/components/functionality/nothing';

// View functionality component definition
export default function OverviewComponent({ tracker, incomingData }) {
  // Set useStates and variables
  const [term, setTerm] = useState("CY");
  const listOfYears = Array.from({ length: 19 }, (_, i) => (i === 0 ? "CY" : `CY-${i}`));

  // Create a router
  const router = useRouter();

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
      className="flex flex-col h-full overflow-y-scroll"
    >
      {Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).map((item) => (
        <SummaryCard 
          key={item} 
          incomingData={JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()][item]}
          term={term}
        />
      ))}
    </div>
  );

  // Stats list sub-component
  const statsList = (
    <div>
      <StatCard
        keyText={`Number of ${tracker}`}
        valueText={(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length)}
      />
    </div>
  )

  // Render the View functionality component 
  return(
    <div className="flex-1 flex-row h-full overflow-y-auto">
      <div className="flex gap-6">
        <div className="flex flex-col w-9/12">
          <div className="flex flex-row items-center mb-3 gap-2">
            <div className="text-4xl">
              Summary for 
            </div>
            <BottomDropDown
              listOfItems={listOfYears}
              setSelected={setTerm}
            />
          </div>
          <div className="flex-1 h-screen">
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