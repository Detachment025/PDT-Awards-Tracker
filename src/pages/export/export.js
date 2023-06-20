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
import { useContext, useState } from 'react';
import { config } from '@/config/config';

// Custom Imports
import { DataContext } from '@/utils/data';

// React.js and Next.js libraries
import { useRouter } from 'next/router';

// Export component definition
export default function ExportComponent({ tracker }) {
  // Get functions provided by the data context
  const { data } = useContext(DataContext);

  // Set useStates and variables
  const [term, setTerm] = useState("AY");
  const listOfYears = Array.from(
    { length: 18 }, (_, i) => (i === 0 ? `AY (${getYear() - i})` : `AY-${i} (${getYear() - i})`)
  );
  tracker = tracker || Object.keys(config)[0];

  // Create a router
  const router = useRouter();

  // Function to get the list of available items for the given academic year
  const getItems = () => {
    // Get the items from the given tracker
    const keys = Object.keys(data[tracker] || {});

    // Get the items that have the current year
    var itemList = [];
    for (let i = 0; i < keys.length; i++) {
      // Check if the iterated keys has the current year
      if (Object.keys(data[tracker][[keys[i]]]["terms"] || {}).includes(relativeToAbsoluteYear(term).toString())) {
        // Check if the iterated keys have a key status length of more than one
        if (data[tracker][[keys[i]]]["terms"][relativeToAbsoluteYear(term).toString()]
          [config[tracker]["key"]].length > 0
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
    // Get content of the div to print and make a new window
    const content = document.getElementById("printable");
    const newWindow = window.open('', '_blank');

    // get the external and inline styles of the original document
    const styles = [...document.styleSheets]
      .map((styleSheet) => {
        try {
          return [...styleSheet.cssRules]
            .map(rule => rule.cssText)
            .join('\n');
        } catch {
          return '';
        }
      })
      .join('\n');

    // get the html of the content and inline its styles
    const html = `<div style="${getComputedStyle(content).cssText} margin: 30px;">${content.innerHTML}</div>`;

    // build a new document with the same styles and html
    newWindow.document.write(`
      <style>${styles}</style>
      ${html}
    `);

    // Finalize action
    newWindow.document.close();
    setTimeout(() => {
      newWindow.print();
    }, 500);
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
    <div className="flex flex-col gap-3 overflow-y-scroll p-2">
      {getItems().map((item) => (
        <StatCard
          key={`exportable-${item}`}
          keyContent={item}
          valueContent={
            <div className="flex flex-col gap-4 text-3xl">
              {data[tracker][item]["terms"][relativeToAbsoluteYear(term).toString()]
              [config[tracker]["key"]].map(keyItem => (<div key={`exportable-div-${item}`}>{keyItem}</div>))}
            </div>
          }
        />
      ))}
    </div>
  )

  // Render component
  return(
    <div className="flex flex-col items-center overflow-y-hidden h-full w-full gap-10">
      <div className="flex flex-col overflow-y-hidden h-full w-1/2 gap-3" id="printable">
        <div className="flex flex-row items-center gap-2">
          <div className="text-2xl">
            Persons {config[tracker]["key"]} for
          </div>
          <BottomDropDown
            listOfItems={listOfYears}
            setSelected={setTerm}
            headSize="xl"
          />
        </div>
        {(Object.keys(data[tracker] || {}).length === 0) ? NoDataRecorded : ItemLister}
      </div>
      <button
        className="flex-1 text-white text-2xl rounded-lg shadow-lg bg-bermuda px-3 py-1
        hover:bg-darkbermuda hover:-translate-y-[0.1rem] hover:shadow-md"
        onClick={exportToPDF}
      >
        Print/Export PDF
      </button>
    </div>
  );
}