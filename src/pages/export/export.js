// React Icons
import { 
  VscAdd 
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { BottomDropDown } from '@/components/subcomponent/dropdown';
import { relativeToAbsoluteYear, getYear } from '@/utils/years';
import { Nothing } from '@/components/functionality/nothing';
import { StatCard } from '@/components/subcomponent/cards';
import { useContext, useState, useRef } from 'react';
import { config } from '@/config/config';

// HTML to PDF Import
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

// Custom Imports
import { DataContext } from '@/utils/data';

// React.js and Next.js libraries
import { useRouter } from 'next/router';

import axios from 'axios';

// Export component definition
export default function ExportComponent({ tracker }) {
  // Get functions provided by the data context
	const { 
		addItem, 
		updateItem, 
		deleteItem, 
		toggleCompleted, 
		updateStatusCategory, 
		data,
		setData
	} = useContext(DataContext);

  // Set useStates and variables
  const [term, setTerm] = useState("AY");
  const listOfYears = Array.from(
    { length: 18 }, (_, i) => (i === 0 ? `AY (${getYear() - i})` : `AY-${i} (${getYear() - i})`)
  );

  // Create a router
  const router = useRouter();

  // Make ref for the exportable div
  const divRef = useRef();

  // Function to get the list of available items for the given academic year
  const getItems = () => {
    // Get the items from the given tracker
    const keys = Object.keys(data[tracker.toLowerCase()]);

    // Get the items that have the current year
    var itemList = [];
    for (let i = 0; i < keys.length; i++) {
      // Check if the iterated keys has the current year
      if (Object.keys(data[tracker.toLowerCase()][[keys[i]]]["terms"]).includes(relativeToAbsoluteYear(term).toString())) {
        // Check if the iterated keys have a key status length of more than one
        if (data[tracker.toLowerCase()][[keys[i]]]["terms"][relativeToAbsoluteYear(term).toString()]
          [config[tracker.toLowerCase()]["key"]].length > 0
        ) {
          // Added iterated item to itemList
          itemList.push(keys[i]);
        }
      }
    }
    
    // Return the list
    return itemList;
  };

  // Export div to PDF function
  const exportToPDF = () => {
    // Get the current content of the div
    const input = divRef.current;

    // Save and export
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
      });
  }

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

  // Item lister component
  const ItemLister = (
    <div className="flex flex-col gap-3 overflow-y-scroll">
      {getItems().map((item) => (
        <StatCard
          key={`exportable-${item}`}
          keyContent={item}
          valueContent={
            <div className="flex flex-col gap-4 text-3xl">
              {data[tracker.toLowerCase()][item]["terms"][relativeToAbsoluteYear(term).toString()]
              [config[tracker.toLowerCase()]["key"]].map(keyItem => (<div key={`exportable-div-${item}`}>{keyItem}</div>))}
            </div>
          }
        />
      ))}
    </div>
  )

  // Render component
  return(
    <div className="flex flex-col items-center h-full w-full gap-10 overflow-y-hidden">
      <div className="flex flex-col h-full w-1/3 gap-3 overflow-y-hidden" ref={divRef}>
        <div className="flex flex-row items-center gap-2">
          <div className="text-2xl">
            Persons {config[tracker.toLowerCase()]["key"]} for
          </div>
          <BottomDropDown
            listOfItems={listOfYears}
            setSelected={setTerm}
            headSize="xl"
          />
        </div>
        {(Object.keys(data[tracker.toLowerCase()]).length === 0) ? NoDataRecorded : ItemLister}
      </div>
      <button 
        className="flex-1 text-white text-2xl rounded-lg shadow-lg bg-bermuda px-3 py-1
        hover:bg-darkbermuda hover:-translate-y-[0.09rem] hover:drop-shadow-lg"
        onClick={exportToPDF}
      >
        Export PDF
      </button>
    </div>
  );
}