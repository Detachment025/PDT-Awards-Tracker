// React Icons
import {
  VscAdd,
  VscPassFilled,
  VscError,
  VscChevronDown,
  VscChevronUp,
} from "react-icons/vsc";
import { IconContext } from "react-icons";

// Next.js and React.js Imports
import { useContext, useState, useEffect } from "react";

// Custom Imports
import { relativeToAbsoluteYear, absoluteToRelativeYear } from "@/utils/years";
import { Nothing } from "@/components/functionality/nothing";
import { FreeAdd } from "@/components/subcomponent/freeadd";
import { Card } from "@/components/subcomponent/cards";
import { DataContext } from "@/utils/data";
import { config } from "@/config/config";

// Summary Card definition
export function SummaryCard({ itemName, term, tracker, setChange }) {
  // Get functions provided by the data context
  const { toggleCompleted, updateStatusCategory, data } =
    useContext(DataContext);

  // Create a useState for the data
  const [completed, setCompleted] = useState(
    data[tracker][itemName]["tags"]["completed"]
  );
  const [infoData, setInfoData] = useState(data[tracker][itemName]);
  const [expanded, setExpanded] = useState(
    !data[tracker][itemName]["tags"]["completed"]
  );

  // Create a setData wrapper that enhances the
  // functionality of the setData function
  const changeInfo = (changes, statusCategory) => {
    // Copy the data
    var clone = { ...infoData };

    // Update the clone's data
    clone["terms"][relativeToAbsoluteYear(term).toString()][statusCategory] =
      changes;

    // Update the data and call setChange
    updateStatusCategory(
      tracker,
      itemName,
      relativeToAbsoluteYear(term).toString(),
      statusCategory,
      changes
    );
    setInfoData(clone);
    setChange(Math.random());
  };

  // Get the difference between the primary and secondary list
  const getDiff = (primary, secondary) => {
    if (primary) return primary.filter((item) => !secondary.includes(item));
  };

  // Render component
  return (
    <div className="text-left shadow-md rounded-lg border-2 p-2 mb-3">
      <div
        className="flex flex-row text-2xl items-center justify-between
        gap-3"
      >
        <div className="flex flew-row gap-3">
          <div className="flex flex-row text-2xl items-center gap-1">
            {
              <button
                onClick={() => {
                  toggleCompleted(tracker, itemName, setCompleted);
                  setChange(Math.random());
                  setExpanded(!expanded);
                }}
                className={completed ? "text-bermuda" : "text-scarlet"}
              >
                <IconContext.Provider value={{ size: "1.2em" }}>
                  {completed ? <VscPassFilled /> : <VscError />}
                </IconContext.Provider>
              </button>
            }
            {itemName}
          </div>
          <div className="flex flex-row text-2xl items-center gap-2">
            {infoData["tags"]["jnac"] && (
              <Card
                text={"JNAC"}
                size={"sm"}
                pad={0.5}
                bg={"bg-bermuda"}
                borderColor={"border-bermuda"}
                textColor="text-white"
              />
            )}
            {infoData["tags"]["usafa"] && (
              <Card
                text={"USAFA"}
                size={"sm"}
                pad={0.5}
                bg={"bg-malibu"}
                borderColor={"border-malibu"}
                textColor="text-white"
              />
            )}
            {infoData["tags"]["local"] && (
              <Card
                text={"Local"}
                size={"sm"}
                pad={0.5}
                bg={"bg-maroon"}
                borderColor={"border-maroon"}
                textColor="text-white"
              />
            )}
          </div>
        </div>
        <button
          className={`flex flex-row`}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {(!expanded && <VscChevronUp size="1.5em" />) ||
            (expanded && <VscChevronDown size="1.5em" />)}
        </button>
      </div>
      {expanded && (
        <div className="flex flex-row gap-2">
          {infoData["statusCategories"].map((item, index) => (
            <div className="flex-1 flex flex-col" key={`statusCat-${index}`}>
              {item}
              {infoData["terms"][relativeToAbsoluteYear(term).toString()][item]
                .length === 0 ? (
                <Nothing
                  mainText={`No One ${item}`}
                  subText={
                    <div className="flex text-md items-center justify-center">
                      <button
                        className="flex items-center justify-center bg-scarlet
                        text-md px-2 py-[0.01rem] mr-1 rounded-lg text-white
                        hover:bg-darkscarlet hover:-translate-y-[0.07rem]
                        hover:drop-shadow-lg"
                        onClick={() => {
                          changeInfo([`${item} #1`], item);
                        }}
                      >
                        <IconContext.Provider
                          value={{ size: "1em", className: "mr-1" }}
                        >
                          <VscAdd />
                        </IconContext.Provider>
                        Add
                      </button>
                    </div>
                  }
                />
              ) : (
                <>
                  <FreeAdd
                    itemList={
                      infoData["terms"][
                        relativeToAbsoluteYear(term).toString()
                      ][item]
                    }
                    setItemList={(item, category) => {
                      changeInfo(item, category);
                    }}
                    type={item}
                    fontSize="sm"
                    iconSize="1.5"
                    spanFullWidth={true}
                    dropDown={config[tracker]["key"] === item}
                    padding="0.5"
                    additionalList={getDiff(
                      infoData["terms"][
                        relativeToAbsoluteYear(term).toString()
                      ][
                        Object.keys(
                          infoData["terms"][
                            relativeToAbsoluteYear(term).toString()
                          ]
                        )[index + 1]
                      ],
                      infoData["terms"][relativeToAbsoluteYear(term)][
                        Object.keys(
                          infoData["terms"][
                            relativeToAbsoluteYear(term).toString()
                          ]
                        )[index]
                      ]
                    )}
                  />
                </>
              )}
            </div>
          ))}
          <div className="flex-1 flex flex-col">
            Previously{" "}
            {config[tracker]["key"].charAt(0).toUpperCase() +
              config[tracker]["key"].slice(1)}
            <table className="border-spacing-1 h-full min-w-full ">
              <thead style={{ display: "none" }}>
                <tr>
                  <th className="text-clip">AY</th>
                  <th>List of People</th>
                </tr>
              </thead>
              <tbody className="justify-between">
                {Array.from(
                  { length: 4 },
                  (_, i) => relativeToAbsoluteYear(term) - (i + 1)
                ).map((item) => (
                  <tr key={`year-${item}`}>
                    <td
                      className="align-top text-left text-xl w-1/12"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {`${absoluteToRelativeYear(item)} (${item}):`}
                    </td>
                    {Object.keys(infoData["terms"]).includes(
                      item.toString()
                    ) ? (
                      <td className="flex pl-2">
                        {infoData["terms"][item][config[tracker]["key"]]
                          .length !== 0 ? (
                          <div
                            className="flex flex-row flex-wrap
                            text-darkbermuda gap-1"
                          >
                            {infoData["terms"][item][
                              config[tracker]["key"]
                            ].map((statusItem) => (
                              <div
                                className="text-white bg-bermuda rounded-lg
                                py-0.5 px-1"
                                key={`key-${statusItem}`}
                              >
                                {statusItem}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div
                            className="text-white bg-scarlet rounded-lg
                            py-0.5 px-1 w-fit"
                          >
                            No One{" "}
                            {config[tracker]["key"].charAt(0).toUpperCase() +
                              config[tracker]["key"].slice(1)}
                          </div>
                        )}
                      </td>
                    ) : (
                      <td className="flex pl-2">
                        <div className="text-scarlet pt-0.5">
                          No Data Recorded
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
