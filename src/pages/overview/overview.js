// React Icons
import { 
  VscAdd 
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// Custom imports
import { CheckboxComponent } from '@/components/subcomponent/checkbox';
import { BottomDropDown } from '@/components/subcomponent/dropdown';
import { Nothing } from '@/components/functionality/nothing';
import { StatCard } from '@/components/subcomponent/cards';
import { relativeToAbsoluteYear } from '@/utils/years';
import { DataContext } from '@/utils/data';
import { config } from '@/config/config';
import { SummaryCard } from './card';

// React.js and Next.js libraries
import { useContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';

// Date functionalities import
const moment = require('moment');

// View functionality component definition
export default function OverviewComponent({ tracker }) {
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
  const [term, setTerm] = useState("CY");
  const [filter, setFilter] = useState({ usafa: true, jnac: true, completed: true });
  const [listOfItems, setItemList] = useState(Object.keys(data[tracker.toLowerCase()]));
  const [change, setChange] = useState(Math.random());
  const [statList, setStatList] = useState();
  const listOfYears = Array.from(
    { length: 18 }, (_, i) => (i === 0 ? `CY (${moment().year() - i})` : `CY-${i} (${moment().year() - i})`)
  );

  // Create a router
  const router = useRouter();

  // Change statList on change of change
  useEffect(() => {
    // Update stat list
    setStatList(
      <div className='flex flex-col gap-3'>
        <StatCard
          keyText={`Number of ${tracker}`}
          valueText={listOfItems.length}
        />
        <StatCard
          keyText={`Percentage of ${tracker} Won`}
          valueText={
            (100 * Object.values(data[tracker.toLowerCase()]).filter(item => item.tags.completed && listOfItems.includes(item.id)).length 
              / (listOfItems.length == 0 ? 1 : listOfItems.length)
            ).toFixed(2).toString() + "%"
          }
        />
        <StatCard
          keyText={`Number of Unique Cadets ${config[tracker.toLowerCase()]["key"]}`}
          valueText={uniqueCount(config[tracker.toLowerCase()]["key"])}
        />
        <StatCard
          keyText={`Number of Unique Cadets ${config[tracker.toLowerCase()]["secondary"]}`}
          valueText={uniqueCount(config[tracker.toLowerCase()]["secondary"])}
        />
      </div>
    );
  }, [change, listOfItems, filter]);

  // Sort and filter on change of usafa and jnac tags
  useEffect(() => {
    // Make copy of listOfItems
    var copy = Object.keys(data[tracker.toLowerCase()]);

    // Filter out usafa
    copy = copy.filter(key => 
      Object.keys(filter).some(
        option => data[tracker.toLowerCase()][key]["tags"][option] && 
        filter[option]
      ) ||
      Object.values(
        data[tracker.toLowerCase()][key]["tags"]).every(val => val === false
      )
    );

    // Sort list 
    copy.sort((a, b) => {
      // Get the root data
      const root = data[tracker.toLowerCase()];
  
      // Sort by completed tag, pushing completed items to end
      if (root[a].tags.completed && !root[b].tags.completed) return 1;
      if (!root[a].tags.completed && root[b].tags.completed) return -1;
  
      // Then sort by initialization date
      let dateA = moment(`${root[a].initARMS.month}-${root[a].initARMS.year}`, 'MM-YYYY').toDate()
      let dateB = moment(`${root[b].initARMS.month}-${root[b].initARMS.year}`, 'MM-YYYY').toDate();
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;

      // Sort by presence of USAFA tag first
      if (root[a].tags.usafa && !root[b].tags.usafa) return 1;
      if (!root[a].tags.usafa && root[b].tags.usafa) return -1;

      // Sort by presence of JNAC tag first
      if (root[a].tags.jnac && !root[b].tags.jnac) return 1;
      if (!root[a].tags.jnac && root[b].tags.jnac) return -1;
  
      // Finally sort by name
      if (a < b) return -1;
      if (a > b) return 1;
    })

    // Set item list
    setItemList(copy);
  }, [change, filter]);

  // Filter handler
  const handleFilterChange = (option) => {
    setFilter(prevFilter => ({ ...prevFilter, [option]: !prevFilter[option] }));
  };

  // Calculate unique items of cadets in a status category
  const uniqueCount = (status) => {
    // Create a temporary list
    var tempList = [];

    // Grab the data to iterate through
    var iterData = data[tracker.toLowerCase()];

    // Go through each given status category and add the value to the temp list
    for (var item of Object.keys(iterData)) {
      for (var info of iterData[item]["terms"][relativeToAbsoluteYear(term)][status]) {
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
          setChange={setChange}
        />
      ))}
    </div>
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