// React Icons
import { 
  VscError,
  VscAdd 
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useRouter } from 'next/router';

// Custom imports
import { Card, KeyValueCard } from '@/components/subcomponent/cards';

// View functionality component definition
export default function OverviewComponent({ tracker, incomingData }) {
  // Create a router
  const router = useRouter();

  // No Data Recorded sub-component
  const NoDataRecorded = (
    <div 
      className="h-full w-full flex flex-col items-center justify-center rounded-lg 
      border-2 border-dashed border-bermuda  text-bermuda"
    >
      <IconContext.Provider value={{size: "5em", className: "mb-3"}}>
        <VscError/>
      </IconContext.Provider>
      <div className="text-xl">
        No Data Recorded
      </div>
      <div className="flex text-md items-center justify-center">
        <button 
          className="flex items-center justify-center bg-bermuda text-md px-2 py-[0.01rem] mr-1 rounded-lg text-white 
          hover:bg-darkbermuda hover:-translate-y-[0.07rem] hover:drop-shadow-lg"
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
    </div> 
  );

  // Summary list sub-component
  const summaryList = (
    <div 
      className="flex flex-col h-full overflow-y-scroll"
    >
      {Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).map((item) => (
        <Card key={item} text={item} size={"2xl"}/>
      ))}
    </div>
  );

  // Stats list sub-component
  const statsList = (
    <div>
      <KeyValueCard
        keyText={`Number of ${tracker}`}
        valueText={(Object.keys(JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]).length)}
      />
    </div>
  )

  // Render the View functionality component 
  return(
    <div className="flex-1">
      <div className="flex h-full gap-6">
        <div className="flex flex-col w-9/12 h-full">
          <div className=" text-4xl mb-3">
            Summary 
          </div>
          <div className="flex-1">
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