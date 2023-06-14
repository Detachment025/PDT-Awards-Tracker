// React Icons
import {
  VscAdd
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { Nothing } from '@/components/functionality/nothing';
import { useContext, useState, useEffect } from 'react';

// Custom Imports
import { DataContext } from '@/utils/data';

// React.js and Next.js libraries
import { useRouter } from 'next/router';

// Export component definition
export default function SearchComponent({ tracker }) {
  // Get functions and information provided by the data context
  const { data } = useContext(DataContext);

  // Set useStates and variables
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const headers = [tracker.slice(0, -1), "Term", "Status", "Person"];

  // Create a router
  const router = useRouter();

  // Use useEffect to print the input value whenever it changes
  useEffect(() => {
    // Create a result matrix for tables
    let result = [];

    // Iterate through each tracker
    for (let item in data[tracker.toLowerCase()]) {
      // Iterate through each term
      for (let term in data[tracker.toLowerCase()][item]["terms"]) {
        // Iterate through each status category
        for (let status in data[tracker.toLowerCase()][item]["terms"][term]) {
          // Iterate through each item in the iterate status category
          for (let person of data[tracker.toLowerCase()][item]["terms"][term][status]) {
            // Check if the inputted value is equal to the iterated person
            if (person.includes(input) && input !== "") {
              result.push([item, term, status, person])
            }
          }
        }
      }
    }

    // Set the result
    setResult(result);
  }, [input]);

  // No Data Recorded sub-component
  const NoDataRecorded = (
    <Nothing
      mainText={"No Data Recorded"}
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

  // Nothing inputted sub-component
  const NoSearchInput = (
    <Nothing
      mainText={"Nothing Inputted"}
      subText={"Search for Something"}
    />
  );

  // No results sub-component
  const NoResults = (
    <Nothing
      mainText={"No Results"}
      subText={"Nothing Came Out"}
    />
  );

  // No results sub-component
  const FoundResults = (
    <table className="w-full">
      <thead className="bg-white sticky top-0">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="text-left px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="overflow-y-auto">
        {result.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Content search result sub-component
  const SearchResults = (
    <div className="overflow-y-auto h-full">
      {input === "" ? NoSearchInput : (result.length === 0 ? NoResults : FoundResults)}
    </div>
  )

  // Render component
  return(
    <div className="flex flex-col overflow-y-hidden h-full w-full gap-6">
      <div className="flex flex-row gap-2">
        <input
          className="text-2xl border-2 rounded-lg p-2 w-full"
          placeholder="Search for Someone!"
          onChange={event => setInput(event.target.value)}
        />
        <button
          className="text-2xl text-white bg-bermuda rounded-lg w-1/12 p-1
          hover:bg-darkbermuda hover:-translate-y-[0.1rem] hover:drop-shadow-md"
        >
          Search
        </button>
      </div>
      {(Object.keys(data[tracker.toLowerCase()]).length === 0) ? NoDataRecorded : SearchResults}
    </div>
  );
}