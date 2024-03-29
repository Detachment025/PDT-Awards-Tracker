// Imports
import { ErrorToaster, SuccessToaster } from "../subcomponent/toasters";
import React, { useContext, useState, useEffect, useRef } from "react";
import { DataContext } from "@/utils/data";
import { config } from "@/config/config";
import Cookies from "js-cookie";

// Data file check definitions
const DataCheck = ({ setFinish }) => {
  // Get functions provided by the data context
  const { data, setData } = useContext(DataContext);

  // Set dropdown menu state(s)
  const [response, setResponse] = useState();

  // ************************************************************
  // NEW DATASET HANDLING
  // ************************************************************

  // New data button click handler
  const newData = () => {
    // Add new value
    const newValue = { ...data, awards: {}, pdts: {} };

    // Update states
    Cookies.set("dataPresence", true);
    setFinish("true");
    setData(newValue);

    // Show success toaster
    SuccessToaster("New dataset successfully created");
  };

  // ************************************************************
  // IMPORT FILE HANDLING
  // ************************************************************

  // Imported file ref initialization
  const fileInput = useRef(null);

  // Import file handle method
  const importData = () => {
    fileInput.current.click();
  };

  // File reading method
  const handleFileChange = (event) => {
    // Get the file object of the selected file
    const file = event.target.files[0];

    // Make file reader
    const reader = new FileReader();

    // Pass file object to the file reader
    reader.readAsText(file);

    // Read the content of the file and save it
    reader.onload = () => {
      // Save results
      var res = reader.result;

      // Check if the headers are present
      if (
        !(
          JSON.parse(res).hasOwnProperty("awards") &&
          JSON.parse(res).hasOwnProperty("pdts")
        )
      ) {
        // Show error toaster
        ErrorToaster(
          "The file you selected does not contain proper the tracking information"
        );

        // Return
        return;
      }

      // Get a JSON representation of the imported data
      res = JSON.parse(res);

      // Iterate through the awards content and apply fixes if need be
      for (var item in res.awards) {
        for (var tag of config.all.tags) {
          if (!(tag in res.awards[item].tags)) {
            res.awards[item].tags[tag] = false;
          }
        }
      }

      // Iterate through the pdts content and apply fixes if need be
      for (var item in res.pdts) {
        for (var tag of config.all.tags) {
          if (!(tag in res.pdts[item].tags)) {
            res.pdts[item].tags[tag] = false;
          }
        }
      }

      // Update the useStates
      Cookies.set("dataPresence", true);
      setFinish("true");
      setData(res);

      // Show success toaster
      SuccessToaster("Information successfully imported");
    };
  };

  // ************************************************************
  // JSON DATA HANDLING AND INFORMATION RENDERING
  // ************************************************************

  // Show data selection options if no data is present
  useEffect(() => {
    setResponse(
      Object.keys(data).length === 0 && (
        <div
          className="h-full w-full pb-10 flex items-center justify-center
          text-2xl"
        >
          <div className=" text-xl">There is no data selected,</div>
          <div>
            <button
              className="bg-bermuda text-xl text-white px-2 py-1 mx-2
              rounded-lg hover:bg-darkbermuda hover:-translate-y-[0.09rem]
              hover:drop-shadow-lg"
              onClick={importData}
            >
              Import
            </button>
            <input
              type="file"
              ref={fileInput}
              style={{ display: "none" }}
              accept=".json"
              onChange={handleFileChange}
            />
          </div>
          <div className="or">or</div>
          <button
            className="bg-bermuda text-xl text-white px-2 py-1 mx-2
            rounded-lg hover:bg-darkbermuda hover:-translate-y-[0.09rem]
            hover:drop-shadow-lg"
            onClick={newData}
          >
            Create New Dataset
          </button>
          <div className="or">.</div>
        </div>
      )
    );
  }, [data]);

  // Returned information
  return <div className="flex-1">{response}</div>;
};

// Export component
export default DataCheck;
