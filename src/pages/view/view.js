// React Icons
import { 
  VscError,
  VscAdd 
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Cookies libraries
import Cookies from 'js-cookie';

// View functionality component definition
export default function ViewComponent({ tracker, incomingData }) {
  // Create a router
  const router = useRouter();

  // No Data Recorded sub-component
  const NoDataRecorded = (
    <div 
      className="h-full w-full flex flex-col items-center justify-center rounded-lg 
      border-2 border-dashed border-bermuda font-poppins text-bermuda"
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
          onClick={() => {router.push("/add")}}
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
  
  // PDT Content of the page
  const PDTContent = (
    <div className="flex h-full">
      <div className="flex flex-col w-9/12 h-full mr-6">
        <div className="font-poppins text-4xl mb-3">
          Summary 
        </div>
        <div className="flex-1">
          {(Object.keys(incomingData).length === 0) ? NoDataRecorded : <>TEST</>}
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className="font-poppins text-4xl mb-3">
          Stats 
        </div>
        <div className="flex-1">
          {(Object.keys(incomingData).length === 0) ? NoDataRecorded : <>TEST</>}
        </div>
      </div>
    </div>
  );

  // Awards Content of the page
  const awardsContent = (
    <div className="flex h-full">
      <div className="flex flex-col w-9/12 h-full mr-6">
        <div className="font-poppins text-4xl mb-3">
          Summary 
        </div>
        <div className="flex-1">
          {(Object.keys(incomingData).length === 0) ? NoDataRecorded : <>TEST</>}
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className="font-poppins text-4xl mb-3">
          Stats 
        </div>
        <div className="flex-1">
          {(Object.keys(incomingData).length === 0) ? NoDataRecorded : <>TEST</>}
        </div>
      </div>
    </div>
  );

  // Render the View functionality component 
  return(
    <div className="flex-1">
      {(tracker === "Awards") ? awardsContent : PDTContent}
    </div>
  );
}