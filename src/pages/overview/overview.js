// React Icons
import {
  VscAdd
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// Custom imports
import { CheckboxComponent } from '@/components/subcomponent/checkbox';
import { BottomDropDown } from '@/components/subcomponent/dropdown';
import { relativeToAbsoluteYear, getYear } from '@/utils/years';
import { Nothing } from '@/components/functionality/nothing';
import { StatCard } from '@/components/subcomponent/cards';
import { DataContext } from '@/utils/data';
import { sorter } from '@/utils/itemList';
import { config } from '@/config/config';
import { SummaryCard } from './card';

// React.js and Next.js libraries
import { useContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';

// View functionality component definition
export default function OverviewComponent({ tracker }) {
  // Get functions provided by the data context
  const {
    data
  } = useContext(DataContext);

  // Set useStates and variables
  const [term, setTerm] = useState("AY");
  const [filter, setFilter] = useState({ usafa: true, jnac: true, completed: true });
  const [change, setChange] = useState(Math.random());
  const [statList, setStatList] = useState();
  const [summaryList, setSummaryList] = useState();
  const listOfYears = Array.from(
    { length: 18 }, (_, i) => (i === 0 ? `AY (${getYear() - i})` : `AY-${i} (${getYear() - i})`)
  );

  // Create a router
  const router = useRouter();

  // Change statList on change of change
  useEffect(() => {
    // Copy listOfItems and create an empty list
    var contentList = [];

    // Iterate through each element in the copy
    var itemList = Object.keys(data[tracker.toLowerCase()]);
    for (let i = 0; i < itemList.length; i++) {
      // Check if the current selected year is in the terms section
      if (Object.keys(data[tracker.toLowerCase()][itemList[i]]["terms"]).includes(relativeToAbsoluteYear(term).toString())) {
        contentList.push(itemList[i]);
      }
    }

    // Sort tempList
    contentList = sorter(data, contentList, tracker.toLowerCase(), filter);

    // Set summary list
    setSummaryList(
      <div
        className="flex flex-col h-full"
      >
        {contentList.map((item) => (
          <SummaryCard
            key={item}
            itemName={item}
            term={term}
            tracker={tracker.toLowerCase()}
            setChange={setChange}
          />
        ))}
      </div>
    );

    // Update stat list
    setStatList(
      <div className='flex flex-col p-1 gap-3'>
        <StatCard
          keyContent={`Number of ${tracker}`}
          valueContent={contentList.length}
        />
        <StatCard
          keyContent={`Percentage of ${tracker} Completed`}
          valueContent={
            (100 * Object.values(data[tracker.toLowerCase()]).filter(item => item.tags.completed && contentList.includes(item.id)).length
              / (contentList.length == 0 ? 1 : contentList.length)
            ).toFixed(2).toString() + "%"
          }
        />
        <StatCard
          keyContent={`Number of Unique Cadets ${config[tracker.toLowerCase()]["key"]}`}
          valueContent={uniqueCount(config[tracker.toLowerCase()]["key"], contentList)}
        />
        <StatCard
          keyContent={`Number of Unique Cadets ${config[tracker.toLowerCase()]["secondary"]}`}
          valueContent={uniqueCount(config[tracker.toLowerCase()]["secondary"], contentList)}
        />
      </div>
    );
  }, [change, filter, term]);

  // Filter handler
  const handleFilterChange = (option) => {
    setFilter(prevFilter => ({ ...prevFilter, [option]: !prevFilter[option] }));
  };

  // Calculate unique items of cadets in a status category
  const uniqueCount = (status, comparator) => {
    // Create a temporary list
    var tempList = [];

    // Grab the data to iterate through
    var iterData = data[tracker.toLowerCase()];

    // Go through each given status category and add the value to the temp list
    for (var item of comparator) {
      for (var info of iterData[item]["terms"][relativeToAbsoluteYear(term).toString()][status]) {
        tempList = tempList.concat(info)
      }
    }

    // Create a set from the temporary list
    var uniqueValues = new Set(tempList);

    // Return the count of unique items
    return uniqueValues.size;
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

  // Render the View functionality component
  return(
    <div className="flex-1 flex-row h-full overflow-y-hidden">
      <div className="flex gap-6 h-full">
        <div className="flex flex-col w-10/12 h-full">
          <div className="flex flex-row items-center justify-between mb-3 gap-2">
            <div className="flex flex-row items-center justify-between mb-3 gap-2">
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
            <div className="flex flex-row gap-5 mr-3">
              <div className="flex flex-row gap-1.5">
                <CheckboxComponent state={filter['usafa']} setState={() => handleFilterChange('usafa')}/>
                <div className="text-xl">
                  USAFA
                </div>
              </div>
              <div className="flex flex-row gap-1.5">
                <CheckboxComponent state={filter['jnac']} setState={() => handleFilterChange('jnac')}/>
                <div className="text-xl">
                  JNAC
                </div>
              </div>
              <div className="flex flex-row gap-1.5">
                <CheckboxComponent state={filter['completed']} setState={() => handleFilterChange('completed')}/>
                <div className="text-xl">
                  Completed
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-screen overflow-y-scroll pr-1">
            {(Object.keys(data[tracker.toLowerCase()]).length === 0) ? NoDataRecorded : summaryList}
          </div>
        </div>
        <div className="flex-1 flex flex-col h-full">
          <div className=" text-4xl mb-3">
            Stats
          </div>
          <div className="flex-1 overflow-y-scroll pr-1">
            {(Object.keys(data[tracker.toLowerCase()]).length === 0) ? NoDataRecorded : statList}
          </div>
        </div>
      </div>
    </div>
  );
}