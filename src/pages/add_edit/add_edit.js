// React Icons
import {
  VscAdd,
  VscSave,
  VscRefresh,
  VscArchive,
  VscChromeClose,
  VscCheck,
  VscSearch,
} from "react-icons/vsc";
import { IconContext } from "react-icons";

// React.js and Next.js libraries
import { useContext, useState, useEffect } from "react";

// Date functionalities import
const moment = require("moment");

// Custom imports
import {
  ErrorToaster,
  SuccessToaster,
} from "@/components/subcomponent/toasters";
import { CheckboxComponent } from "@/components/subcomponent/checkbox";
import { ButtonCard, Card } from "@/components/subcomponent/cards";
import { Nothing } from "@/components/functionality/nothing";
import { FreeAdd } from "@/components/subcomponent/freeadd";
import { DataContext } from "@/utils/data";
import { sorter } from "@/utils/itemList";
import { config } from "@/config/config";
import { getYear } from "@/utils/years";

// View functionality component definition
export default function AddEditComponent({ tracker }) {
  // Get functions provided by the data context
  const { addItem, updateItem, archiveItem, data } = useContext(DataContext);

  // Variable declaration
  tracker = tracker || Object.keys(config)[0];
  const [statusList, setStatusList] = useState(
    config[tracker]["defaultStatusCategories"]
  );
  const [presence, setPresence] = useState(
    Object.keys(data[tracker] || {}).length
  );
  const [selectedItem, setSelectedItem] = useState("");
  const [itemList, setItemList] = useState();
  const [usafa, setUSAFA] = useState(false);
  const [jnac, setJNAC] = useState(false);
  const [college, setCollege] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [input, setInput] = useState("");

  // Set the defaults for the selected list on
  useEffect(() => {
    setPresence(Object.keys(data[tracker] || {}).length);
    setStatusList(config[tracker]["defaultStatusCategories"]);
  }, [tracker]);

  // Set the selectedStatusCategories on change of the selectedItem
  useEffect(() => {
    // Get current data
    const copy = data[tracker];

    // Check if an item has been selected and set other useStates if need be
    if (selectedItem !== "" && Object.keys(copy).length !== 0) {
      setStatusList(copy[selectedItem]["statusCategories"]);
      populateFields();
    }
  }, [selectedItem]);

  // Change statList on change of change
  useEffect(() => {
    // Set contentList
    var contentList = Object.keys(data[tracker] || {});

    // Filter contentList by the search input
    var searched = [];

    // Iterate through each item in itemList and get the ones that match
    // similarity to inputted query
    for (let item of contentList) {
      // Check if the inputted value is equal to the inputted query
      if (item.includes(input) && input !== "") {
        // If so, append it to the searched list
        searched.push(item);
      }
    }

    // Set contentList if searched is empty
    contentList = searched.length == 0 ? contentList : searched;

    // Sort tempList
    contentList = sorter(data, contentList, tracker);

    // Set item list
    setItemList(
      <div className="flex flex-col h-full overflow-y-scroll px-1">
        {contentList.map((item) => (
          <ButtonCard
            key={item}
            text={item}
            size={"2xl"}
            setSelected={setSelectedItem}
            subtext={
              <div className="flex gap-1.5">
                {data[tracker][item]["tags"]["completed"] && (
                  <IconContext.Provider
                    value={{ color: "#0DD9B5", size: "1.5em" }}
                  >
                    <VscCheck />
                  </IconContext.Provider>
                )}
                {data[tracker][item]["tags"]["jnac"] && (
                  <Card
                    text={"JNAC"}
                    size={"sm"}
                    pad={0.5}
                    bg={"bermuda"}
                    textColor="white"
                  />
                )}
                {data[tracker][item]["tags"]["usafa"] && (
                  <Card
                    text={"USAFA"}
                    size={"sm"}
                    pad={0.5}
                    bg={"[#8C1D40]"}
                    textColor="white"
                  />
                )}
                {data[tracker][item]["tags"]["college"] && (
                  <Card
                    text={"College"}
                    size={"sm"}
                    pad={0.5}
                    bg={"maroon"}
                    textColor="white"
                  />
                )}
                {data[tracker][item]["endYear"] !== null && (
                  <Card
                    text={"Discontinued"}
                    size={"sm"}
                    pad={0.5}
                    bg={"scarlet"}
                    textColor="white"
                  />
                )}
              </div>
            }
          />
        ))}
      </div>
    );
  }, [input, presence]);

  // Handle Wiping the contents of the fields
  const handleReset = () => {
    document.getElementById("name").value = "";
    document.getElementById("ARMSMonth").value = "08";
    document.getElementById("ARMSYear").value = getYear();
    document.getElementById("DOTMonth").value = "";
    document.getElementById("DOTYear").value = "";
    document.getElementById("StartYear").value = getYear();
    document.getElementById("EndYear").value = "";
    setUSAFA(false);
    setJNAC(false);
    setCollege(false);
    setCompleted(false);
    setStatusList(config[tracker]["defaultStatusCategories"]);
  };

  // Handle the population of the input fields
  const populateFields = () => {
    document.getElementById("name").value = selectedItem;
    document.getElementById("ARMSMonth").value =
      data[tracker][selectedItem]["initARMS"]["month"];
    document.getElementById("ARMSYear").value =
      data[tracker][selectedItem]["initARMS"]["year"];
    document.getElementById("DOTMonth").value =
      data[tracker][selectedItem]["rosterDOT"]["month"];
    document.getElementById("DOTYear").value =
      data[tracker][selectedItem]["rosterDOT"]["year"];
    document.getElementById("StartYear").value =
      data[tracker][selectedItem]["startYear"];
    document.getElementById("EndYear").value =
      data[tracker][selectedItem]["endYear"];
    setUSAFA(data[tracker][selectedItem]["tags"]["usafa"]);
    setJNAC(data[tracker][selectedItem]["tags"]["jnac"]);
    setCollege(data[tracker][selectedItem]["tags"]["college"]);
    setCompleted(data[tracker][selectedItem]["tags"]["completed"]);
    setStatusList(data[tracker][selectedItem]["statusCategories"]);
  };

  // Add Award or PDT with given settings
  const addEditAwardOrPDT = () => {
    // Get the value of the Award or PDT name
    const name = document.getElementById("name").value;

    // Check if the name field is not empty
    if (name === "") {
      // Create an error message and return
      ErrorToaster(`${config[tracker].singular} name is empty`);
      return;
    }

    // Check if the Award or PDT being added already exists.
    // If so, create an error message and return
    if (
      Object.keys(data[tracker] || {}).includes(name) &&
      selectedItem === ""
    ) {
      ErrorToaster(`"${name}" ${config[tracker].singular} already exists`);
      return;
    }

    // Set up variables for the all-or-nothing condition on all inputs for the
    // ARMS field
    const armsMonth = document.getElementById("ARMSMonth").value === "";
    const armsYear = document.getElementById("ARMSYear").value === "";

    // Check if the inputs are aligned. If so, create an error message and
    // return
    if (armsMonth && armsYear) {
      ErrorToaster("Expected initial ARMS field needs to be fully filled");
      return;
    }

    // Proceed to check the date validity of the given inputs
    // If so, create an error message and return
    if (
      !moment(
        "25-" +
          document.getElementById("ARMSMonth").value +
          "-" +
          document.getElementById("ARMSYear").value,
        "D-M-YYYY",
        true
      ).isValid() &&
      !(armsMonth && armsYear)
    ) {
      ErrorToaster("Expected initial ARMS field has incorrect date inputted");
      return;
    }

    // Set up variables for the all-or-nothing condition on all inputs for the
    // ARMS field
    const dotMonth = document.getElementById("DOTMonth").value === "";
    const dotYear = document.getElementById("DOTYear").value === "";

    // Check if the inputs are aligned. If so, create an error message and
    // return
    if (!((dotMonth && dotYear) || (!dotMonth && !dotYear))) {
      ErrorToaster(
        "Expected roster to DOT field needs to be fully filled or empty"
      );
      return;
    }

    // Proceed to check the date validity of the given inputs
    // If so, create an error message and return
    if (
      !moment(
        "25-" +
          document.getElementById("DOTMonth").value +
          "-" +
          document.getElementById("DOTYear").value,
        "D-M-YYYY",
        true
      ).isValid() &&
      !(dotMonth && dotYear)
    ) {
      ErrorToaster("Expected roster to DOT field has incorrect date inputted");
      return;
    }

    // Check if end year is before the start year. If so, create an error
    // message and return
    if (
      document.getElementById("EndYear").value !== "" &&
      parseInt(document.getElementById("EndYear").value) <
        parseInt(document.getElementById("StartYear").value)
    ) {
      ErrorToaster("End year cannot be before start year");
      return;
    }

    // Check if the start year is ahead of current year. If so, create an error
    // message and return
    if (parseInt(document.getElementById("StartYear").value) > getYear()) {
      ErrorToaster("Start year cannot be ahead of current year");
      return;
    }

    // Check if the start year is empty. If so, create an error message and
    // return
    if (isNaN(parseInt(document.getElementById("StartYear").value))) {
      ErrorToaster("Start year needs to be filled");
      return;
    }

    // Add item
    const startYear = parseInt(document.getElementById("StartYear").value);
    const endYear = parseInt(document.getElementById("EndYear").value);
    if (selectedItem === "") {
      addItem(
        tracker,
        name,
        statusList,
        usafa,
        jnac,
        college,
        completed,
        startYear,
        endYear
      );
      setPresence(presence + 1);
      // Update Item
    } else {
      updateItem(
        tracker,
        name,
        statusList,
        usafa,
        jnac,
        college,
        completed,
        startYear,
        endYear,
        selectedItem,
        document
      );
    }

    // Empty selected item, reset list, and send toaster message
    setSelectedItem("");
    handleReset();
    SuccessToaster(
      `"${name}" ${config[tracker].singular} successfully ${
        selectedItem === "" ? "created" : "updated"
      }`
    );

    // <!> DEBUG <!>
    // console.log(data)
  };

  // Handle the deletion of an item
  const handleArchiveItem = () => {
    // Delete and Add Award or PDT to the data
    archiveItem(tracker, selectedItem);

    // Set useStates
    setPresence(presence + 0);
    setSelectedItem("");

    // Clear inputs and send success toasters
    handleReset();
    SuccessToaster(
      `"${selectedItem}" ${config[tracker].singular} successfully archived`
    );
  };

  // Handle enter key press on the award/pdt name field
  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      addEditAwardOrPDT();
    }
  };

  // Render the View functionality component
  return (
    <div className="flex-1 flex h-full overflow-y-auto gap-6">
      <div className="flex flex-col overflow-y-scroll pr-4 w-8/12 h-full">
        <div className="text-4xl mb-3">
          {selectedItem === ""
            ? `Add New ${config[tracker].singular}`
            : `Edit ${selectedItem} ${config[tracker].singular}`}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-shrink-0 flex flex-col gap-1">
            <div className="text-2xl">
              {`${config[tracker].singular} Name:`}
            </div>
            <input
              type="text"
              placeholder="Enter a name"
              id="name"
              className="text-xl border-2 rounded-lg h-auto px-1
              focus:border-black shadow-inner"
              onKeyDown={handleEnterPress}
            />
          </div>

          <div className="flex-1 flex flex-col h-1/2 gap-1">
            <div className="text-2xl">Status Categories:</div>
            <div className="border-2 h-full rounded-lg shadow-inner p-3">
              <FreeAdd
                itemList={statusList}
                setItemList={(item, _) => {
                  setStatusList(item);
                }}
                type="status"
                unremovable={
                  config[tracker]["defaultStatusCategoriesUnremovable"]
                    ? config[tracker]["defaultStatusCategories"]
                    : []
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-2xl">Tags</div>
            <div className="flex flex-row gap-7">
              <div className="flex flex-row gap-2">
                <CheckboxComponent state={usafa} setState={setUSAFA} />
                <div className="text-xl">USAFA</div>
              </div>
              <div className="flex flex-row gap-2">
                <CheckboxComponent state={jnac} setState={setJNAC} />
                <div className="text-xl">JNAC</div>
              </div>
              <div className="flex flex-row gap-2">
                <CheckboxComponent state={college} setState={setCollege} />
                <div className="text-xl">College</div>
              </div>
              <div className="flex flex-row gap-2">
                <CheckboxComponent state={completed} setState={setCompleted} />
                <div className="text-xl">Completed</div>
              </div>
            </div>
          </div>

          <div
            className="flex-shrink-0 flex flex-col justify-center w-full
            gap-1"
          >
            <div className="flex flex-row text-2xl items-center gap-1">
              <div>{`First Year ${config[tracker]["key"]}`}</div>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <input
                placeholder="YYYY"
                id="StartYear"
                pattern="[0-9]*"
                defaultValue={getYear()}
                maxLength="4"
                className="text-xl text-poppins rounded-lg border-2 px-1
                focus:border-black shadow-inner w-[4em]"
                onKeyDown={(event) =>
                  !/[0-9]/.test(event.key) &&
                  !(event.key == "Backspace") &&
                  !(event.key == "Delete") &&
                  event.preventDefault()
                }
              />
            </div>
          </div>

          <div
            className="flex-shrink-0 flex flex-col justify-center w-full
            gap-1"
          >
            <div className="flex flex-row text-2xl items-center gap-1">
              <div>{`Last Year ${config[tracker]["key"]}`}</div>
              <div className="text-lg text-gray-400 italic">(Optional)</div>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <input
                placeholder="YYYY"
                id="EndYear"
                pattern="[0-9]*"
                maxLength="4"
                className="text-xl text-poppins rounded-lg border-2 px-1
                focus:border-black shadow-inner w-[4em]"
                onKeyDown={(event) =>
                  !/[0-9]/.test(event.key) &&
                  !(event.key == "Backspace") &&
                  !(event.key == "Delete") &&
                  event.preventDefault()
                }
              />
            </div>
          </div>

          <div
            className="flex-shrink-0 flex flex-col justify-center w-full
            gap-1"
          >
            <div className="flex flex-row text-2xl gap-1">
              <div>Expected Initial ARMS</div>
            </div>
            <div className="flex flex-row gap-3">
              <input
                placeholder="MM"
                id="ARMSMonth"
                pattern="[0-9]*"
                defaultValue="08"
                maxLength="2"
                className="text-xl text-poppins rounded-lg border-2 px-1
                focus:border-black shadow-inner w-[2.4em]"
                onKeyDown={(event) =>
                  !/[0-9]/.test(event.key) &&
                  !(event.key == "Backspace") &&
                  !(event.key == "Delete") &&
                  event.preventDefault()
                }
              />
              <input
                placeholder="YYYY"
                id="ARMSYear"
                pattern="[0-9]*"
                defaultValue={getYear()}
                maxLength="4"
                className="text-xl text-poppins rounded-lg border-2 px-1
                focus:border-black shadow-inner w-[4em]"
                onKeyDown={(event) =>
                  !/[0-9]/.test(event.key) &&
                  !(event.key == "Backspace") &&
                  !(event.key == "Delete") &&
                  event.preventDefault()
                }
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col w-full gap-1">
            <div className="flex flex-row text-2xl gap-1">
              <div>Expected Roster to DOT</div>
              <div className="text-gray-400 italic">(Optional)</div>
            </div>
            <div className="flex flex-row gap-3">
              <input
                placeholder="MM"
                id="DOTMonth"
                pattern="[0-9]*"
                maxLength="2"
                className="text-xl text-poppins rounded-lg border-2 px-1
                focus:border-black shadow-inner w-[2.4em]"
                onKeyDown={(event) =>
                  !/[0-9]/.test(event.key) &&
                  !(event.key == "Backspace") &&
                  !(event.key == "Delete") &&
                  event.preventDefault()
                }
              />
              <input
                placeholder="YYYY"
                id="DOTYear"
                pattern="[0-9]*"
                maxLength="4"
                className="text-xl text-poppins rounded-lg border-2 px-1
                focus:border-black shadow-inner w-[4em]"
                onKeyDown={(event) =>
                  !/[0-9]/.test(event.key) &&
                  !(event.key == "Backspace") &&
                  !(event.key == "Delete") &&
                  event.preventDefault()
                }
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex w-full gap-3">
            <button
              className="flex flex-row justify-center items-center rounded-xl
              bg-bermuda mt-5 py-2 px-3 gap-1.5 hover:bg-darkbermuda
              hover:-translate-y-[0.09rem] hover:drop-shadow-lg"
              onClick={() => {
                addEditAwardOrPDT();
              }}
            >
              <IconContext.Provider value={{ color: "#ffffff", size: "1.2em" }}>
                {selectedItem === "" ? <VscAdd /> : <VscSave />}
              </IconContext.Provider>
              <div className="text-md text-white">
                {selectedItem === ""
                  ? `Add ${config[tracker].singular}`
                  : `Save Changes`}
              </div>
            </button>
            <button
              className="flex flex-row justify-center items-center rounded-xl
              bg-malibu mt-5 py-2 px-3 gap-1.5 hover:bg-darkmalibu
              hover:-translate-y-[0.09rem] hover:drop-shadow-lg"
              onClick={() => {
                selectedItem === "" ? handleReset() : populateFields();
              }}
            >
              <IconContext.Provider value={{ color: "#ffffff", size: "1.2em" }}>
                <VscRefresh />
              </IconContext.Provider>
              <div className="text-md text-white">
                {selectedItem === "" ? `Reset` : `Undo Changes`}
              </div>
            </button>
            {selectedItem !== "" && (
              <button
                className="flex flex-row justify-center items-center rounded-xl
                bg-scarlet mt-5 py-2 px-3 gap-1.5 hover:bg-darkscarlet
                hover:-translate-y-[0.09rem] hover:drop-shadow-lg"
                onClick={() => {
                  handleArchiveItem();
                }}
              >
                <IconContext.Provider
                  value={{ color: "#ffffff", size: "1.2em" }}
                >
                  <VscArchive />
                </IconContext.Provider>
                <div className="text-md text-white">
                  {`Archive ${config[tracker].singular}`}
                </div>
              </button>
            )}
            {selectedItem !== "" && (
              <button
                className="flex flex-row justify-center items-center rounded-xl
                bg-lightsilver mt-5 py-2 px-3 gap-1.5 hover:bg-silver
                hover:-translate-y-[0.09rem] hover:drop-shadow-lg"
                onClick={() => {
                  setSelectedItem("");
                  handleReset();
                }}
              >
                <IconContext.Provider
                  value={{ color: "#ffffff", size: "1.2em" }}
                >
                  <VscChromeClose />
                </IconContext.Provider>
                <div className="text-md text-white">Deselect Item</div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className="flex flex-row justify-between text-4xl mb-3 gap-10">
          {`${config[tracker].plural}`}
          <div className="flex flex-row items-center border shadow-inner
          rounded-lg text-lg w-[20rem] p-1 gap-2 mr-[0.66rem]">
            <IconContext.Provider value={{ size: "1.2em" }}>
              <VscSearch />
            </IconContext.Provider>
            <input
              className="w-full"
              placeholder="Search Item"
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
        </div>
        {!(presence > 0) ? (
          <Nothing mainText={`No Data Recorded`} subText={`Add Some!`} />
        ) : (
          itemList
        )}
      </div>
    </div>
  );
}
