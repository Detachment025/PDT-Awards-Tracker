// React Icons
import { VscAdd } from "react-icons/vsc";
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useContext, useState, useEffect } from "react";

// Custom Imports
import { ErrorToaster } from "@/components/subcomponent/toasters";
import { Nothing } from "@/components/functionality/nothing";
import { DataContext } from "@/utils/data";
import { config } from "@/config/config";

// React.js and Next.js libraries
import { useRouter } from "next/router";

// Export component definition
export default function SearchComponent({ tracker }) {
  // Get functions and information provided by the data context
  const { data } = useContext(DataContext);

  // Set useStates and variables
  tracker = tracker || Object.keys(config)[0];
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const headers = [config[tracker].singular, "Term", "Status", "Person"];

  // Create a router
  const router = useRouter();

  // Use useEffect to print the input value whenever it changes
  useEffect(() => {
    // Create a result matrix for tables
    let result = [];

    // Iterate through each tracker
    for (let item in data[tracker]) {
      // Iterate through each term
      for (let term in data[tracker][item]["terms"]) {
        // Iterate through each status category
        for (let status of Object.keys(
          data[tracker][item]["terms"][term] || {}
        ).reverse()) {
          // Iterate through each item in the iterate status category
          for (let person of data[tracker][item]["terms"][term][status]) {
            // Check if the inputted value is equal to the iterated person
            if (person.includes(input) && input !== "") {
              // If the last info is inferior, remove the last item
              if (
                result.length !== 0 &&
                result[result.length - 1][1] == term &&
                result[result.length - 1][0] == item
              ) {
                result.pop();
              }

              // Add information to the list
              result.push([item, term, status, person]);
            }
          }
        }
      }
    }

    // Set the result
    setResult(result);
  }, [input]);

  // Export content to CSV
  const exportToCSV = async () => {
    // Send error message if there is nothing to export
    if (result.length == 0) {
      ErrorToaster("There's nothing to export")
    }

    try {
      // Send a POST request to the '/api/exportCSV' endpoint with the prepared
      // data and headers
      const response = await fetch("/api/export_xlsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          headers: headers,
          rows: result,
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a temporary URL for the received blob data (CSV content)
      const url = window.URL.createObjectURL(blob);

      // Create a download link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);

      // Programmatically click the link to start the download
      link.click();
    } catch (error) {
      // If any error occurs during the request or processing, log it to the
      // console
      console.error("Error exporting data:", error);
    }
  }

  // No Data Recorded sub-component
  const NoDataRecorded = (
    <Nothing
      mainText={"No Data Recorded"}
      subText={
        <div className="flex text-md items-center justify-center">
          <button
            className="flex items-center justify-center bg-scarlet text-md
            px-2 py-[0.01rem] mr-1 rounded-lg text-white
            hover:bg-darkscarlet hover:-translate-y-[0.07rem]
            hover:drop-shadow-lg"
            onClick={() => {
              router.push("/add_edit");
            }}
          >
            <IconContext.Provider value={{ size: "1em", className: "mr-1" }}>
              <VscAdd />
            </IconContext.Provider>
            Add
          </button>
          <div>Some!</div>
        </div>
      }
    />
  );

  // Nothing inputted sub-component
  const NoSearchInput = (
    <Nothing mainText={"Nothing Inputted"} subText={"Search for Something"} />
  );

  // No results sub-component
  const FoundResults = (
    <table className="w-full">
      <thead className="bg-white sticky top-0">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="text-left px-4 py-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="overflow-y-auto">
        {result.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Content search result sub-component
  const SearchResults = (
    <div className="overflow-y-auto h-full">
      {input === ""
        ? NoSearchInput
        : result.length === 0
        ? <Nothing mainText={"No Results"} subText={"Nothing Came Out"} />
        : FoundResults}
    </div>
  );

  // Render component
  return (
    <div className="flex flex-col overflow-y-hidden h-full w-full gap-6">
      <div className="flex flex-row gap-2 pt-1">
        <input
          className="text-2xl border-2 rounded-lg p-2 w-full"
          placeholder="Search for Someone!"
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="text-2xl text-white bg-bermuda rounded-lg w-3/12 p-1
          hover:bg-darkbermuda hover:-translate-y-[0.1rem]
          hover:drop-shadow-md"
          onClick={exportToCSV}
        >
          Export Result to CSV
        </button>
      </div>
      {Object.keys(data[tracker] || {}).length === 0
        ? NoDataRecorded
        : SearchResults}
    </div>
  );
}
