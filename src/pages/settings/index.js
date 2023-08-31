// Custom components
import PageTitle from "@/components/functionality/pagetitle";
import Sidebar from "@/components/functionality/sidebar";

// Toaster Components and CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// config import
import { get_user_config } from "@/config/config";
import { DataContext } from "@/utils/data";
import { getYear } from "@/utils/years";

// Component import
import {
  ErrorToaster,
  SuccessToaster,
} from "@/components/subcomponent/toasters";

// React.js libraries
import { useEffect, useState, useContext } from "react";

export default function ViewPage() {
  // Get functions provided by the data context
  const { updateItemTerms, getSixYear } = useContext(DataContext);

  // Define useState for the data
  const [actionTrigger, setActionTrigger] = useState(false);
  const [inputTracker, setInputTracker] = useState({
    datapath_edit: false,
    datapath: "",
  });
  const [tracker, setTracker] = useState("");
  const [cfg, setCFG] = useState({});

  // Get the user's config information
  useEffect(() => {
    (async () => {
      const cfg_value = await get_user_config();
      updateInputTracker("datapath", cfg_value.datapath);
      updateInputTracker("sixYearPath", cfg_value.sixYearPath);
      setCFG(cfg_value);
    })();
  }, [actionTrigger]);

  // Update inputTracker
  const updateInputTracker = (key, value) => {
    setInputTracker((prevState) => ({ ...prevState, [key]: value }));
  };

  // Update terms for all PDTs and Awards
  const updateTerms = () => {
    // Get a list of years
    const listOfYears = Array.from(
      { length: 19 },
      (_, i) => `${getYear() - i}`
    );

    // Update the terms for everything
    for (var year of listOfYears) {
      updateItemTerms(year);
    }

    // Success toaster
    SuccessToaster("Updated Terms");
  };

  // User config edit handler
  const updateUserConfig = async (subject, key, value) => {
    try {
      // Make the API request
      const response = await fetch("/api/update_cfg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, value }), // Convert the data to a string
      });

      // Parse the response
      const data = await response.json();

      // Check the response status
      if (!response.ok) {
        ErrorToaster(`Updating ${subject} failed. ${data.error}`);
        return false;
      }

      // Here you can handle the success response, e.g., show a success message
      SuccessToaster(`Changed ${subject} successfully`);
      return true;
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      SuccessToaster(`There was an error: ${error.message}`);
      return false;
    }
  };

  // Async update of the six year report feature
  const updateSixYear = async () => {
    // Update six year value in user config
    if (inputTracker.six_year_edit) {
      const res = await updateUserConfig(
        "sixYearPath",
        "sixYearPath",
        document.getElementById("six_year_path").value
      );
      if (!res) return;
      setActionTrigger(!actionTrigger);
    }

    // Update the input tracker
    updateInputTracker("six_year_edit", !inputTracker.six_year_edit);

    // Save the current six year history
    const pages = getSixYear(tracker);
    const response = await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: pages, tracker: tracker}),
    });
  };

  // Render /export page
  return (
    <div className="relative flex flex-row h-screen">
      <Sidebar setOutsideTracker={setTracker} />
      <div className="flex flex-col w-full m-10">
        <PageTitle className="flex-none" />
        <div className="h-full w-full flex flex-col gap-8">
          <div className="flex-col flex gap-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="text-5xl">Data Path</div>
              <button
                className="text-white text-lg rounded-lg shadow-lg
                bg-bermuda px-3 py-1 hover:bg-darkbermuda
                hover:-translate-y-[0.1rem] hover:shadow-md mt-1"
                onClick={() => {
                  (async () => {
                    if (inputTracker.datapath_edit) {
                      const res = await updateUserConfig(
                        "datapath",
                        "datapath",
                        document.getElementById("datapath_path").value
                      );
                      if (!res) return;
                      setActionTrigger(!actionTrigger);
                    }
                    updateInputTracker(
                      "datapath_edit",
                      !inputTracker.datapath_edit
                    );
                  })();
                }}
              >
                {!inputTracker.datapath_edit ? `Change Path` : `Save Changes`}
              </button>
            </div>
            <div className="text-2xl">
              {!inputTracker.datapath_edit ? (
                <div>{cfg.datapath}</div>
              ) : (
                <input
                  className="w-full p-2 rounded-lg border-silver border
                  shadow-inner"
                  defaultValue={inputTracker.datapath}
                  id="datapath_path"
                />
              )}
            </div>
          </div>
          <div className="flex-col flex gap-4">
            <div className="flex flex-row gap-4 items-center">
              <div className="text-5xl">Six Year Export Path</div>
              <button
                className="text-white text-lg rounded-lg shadow-lg
                bg-bermuda px-3 py-1 hover:bg-darkbermuda
                hover:-translate-y-[0.1rem] hover:shadow-md mt-1"
                onClick={() => {
                  (async () => {
                    await updateSixYear();
                  })();
                }}
              >
                {!inputTracker.six_year_edit ? `Change Path` : `Save Changes`}
              </button>
            </div>
            <div className="text-2xl">
              {!inputTracker.six_year_edit ? (
                <div>{cfg.sixYearPath}</div>
              ) : (
                <input
                  className="w-full p-2 rounded-lg border-silver border
                  shadow-inner"
                  defaultValue={inputTracker.sixYearPath}
                  id="six_year_path"
                />
              )}
            </div>
          </div>
          <button
            className="text-white text-5xl rounded-lg shadow-lg
            bg-bermuda px-5 py-4 hover:bg-darkbermuda
            hover:-translate-y-[0.1rem] hover:shadow-md mt-1 w-fit"
            onClick={updateTerms}
          >
            Update Terms
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
