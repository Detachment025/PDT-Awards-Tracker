// Next.js import functionalities
import React, { createContext, useState } from "react";

// Import year function(s)
import { getYear } from "./years";

// Create context for the data
export const DataContext = createContext();

// Create a data provider
export const DataProvider = ({ children }) => {
  // Create useState for the data
  const [data, setData] = useState({});

  // Save data function
  const saveData = async (content) => {
    // Try to save data
    try {
      // Send an API call
      const response = await fetch("/api/save", {
        method: "POST",
        body: JSON.stringify(content),
      });
      // If an error occurred...
    } catch (error) {
      return;
    }
  };

  // Insert award/pdt item
  const addItem = async (
    itemType,
    name,
    statusList,
    usafa,
    jnac,
    local,
    completed,
    startYear,
    endYear
  ) => {
    // Copy data
    var copy = data;

    // If endYear is NaN, set endYear to null and tempEndYear to current year
    var tempEndYear = endYear;
    if (isNaN(endYear)) {
      tempEndYear = getYear();
      endYear = null;
    }

    // Generate list of years
    const years = [];
    for (
      let year = tempEndYear;
      tempEndYear - (tempEndYear - startYear) <= year;
      year--
    )
      years.push(year);

    // Get append new information to the data
    copy[itemType.toLowerCase()][name] = {
      id: name,
      statusCategories: statusList,
      startYear: startYear,
      endYear: endYear,
      tags: {
        usafa: usafa,
        jnac: jnac,
        local: local,
        completed: completed,
      },
      initARMS: {
        month: document.getElementById("ARMSMonth").value,
        year: document.getElementById("ARMSYear").value,
      },
      rosterDOT: {
        month: document.getElementById("DOTMonth").value,
        year: document.getElementById("DOTYear").value,
      },
      terms: years.reduce((year, key, index) => {
        year[key] = statusList.reduce((cat, key, index) => {
          cat[key] = [];
          return cat;
        }, {});
        return year;
      }, {}),
    };

    // Write to data
    setData(copy);
    await saveData(copy);
  };

  // Update award/pdt item
  const updateItem = async (
    itemType,
    name,
    statusList,
    usafa,
    jnac,
    local,
    completed,
    startYear,
    endYear,
    original,
    srcDocument
  ) => {
    // Copy data and original terms
    var copy = data;
    var orgTerms = data[itemType.toLowerCase()][original]["terms"];

    // If endYear is NaN, set it to null
    if (isNaN(endYear)) {
      endYear = null;
    }

    // Generate 18 years for the terms starting from
    // the 18th year prior to current year
    const years = [];
    for (let year = getYear(); getYear() - 18 < year; year--) years.push(year);

    // If the start year is less than the original start year, add more years
    const originalStartYear = parseInt(
      copy[itemType.toLowerCase()][original]["startYear"]
    );
    if (startYear < originalStartYear) {
      for (let year = originalStartYear; year >= startYear; year--) {
        orgTerms[year.toString()] = statusList.reduce((cat, key, index) => {
          cat[key] = [];
          return cat;
        }, {});
      }
    }

    // Delete award or pdt item
    delete copy[itemType.toLowerCase()][original];

    // Get append new information to the data
    copy[itemType.toLowerCase()][name] = {
      id: name,
      completed: false,
      statusCategories: statusList,
      startYear: startYear,
      endYear: endYear,
      tags: {
        usafa: usafa,
        jnac: jnac,
        local: local,
        completed: completed,
      },
      initARMS: {
        month: srcDocument.getElementById("ARMSMonth").value,
        year: srcDocument.getElementById("ARMSYear").value,
      },
      rosterDOT: {
        month: srcDocument.getElementById("DOTMonth").value,
        year: srcDocument.getElementById("DOTYear").value,
      },
      terms: orgTerms,
    };

    // Write to data
    setData(copy);
    await saveData(copy);
  };

  // Delete award/pdt item
  const archiveItem = async (itemType, name) => {
    // Copy data
    var copy = data;

    // Set the end year to current year
    copy[itemType][name]["endYear"] = getYear();

    // Save the data
    setData(copy);
    await saveData(copy);
  };

  // Toggle completed status of an item
  const toggleCompleted = async (itemType, name, setCompleted) => {
    // Copy data and original terms
    var copy = data;

    // Update completed status
    copy[itemType.toLowerCase()][name]["tags"]["completed"] =
      !copy[itemType.toLowerCase()][name]["tags"]["completed"];

    // Write to data
    setCompleted(copy[itemType.toLowerCase()][name]["tags"]["completed"]);
    setData(copy);
    await saveData(copy);
  };

  // Update a statusCategory
  const updateStatusCategory = async (
    itemType,
    itemName,
    year,
    statusCategory,
    changes
  ) => {
    // Copy data and original terms
    var copy = data;

    // Update completed status
    copy[itemType.toLowerCase()][itemName]["terms"][year][statusCategory] =
      changes;

    // Write to data
    setData(copy);
    await saveData(copy);
  };

  // Update the terms for every item
  const updateItemTerms = async (year) => {
    // Make a copy of the data
    var copy = data;

    // Iterate through every item type
    for (let tracker in copy) {
      // Iterate through every item in every tracker
      for (let item in data[tracker]) {
        // Check if endYear is null
        if (data[tracker][item]["endYear"] == null) {
          // Get the iterated item's status list
          const statusList = data[tracker][item]["statusCategories"];

          // Add the new term
          copy[tracker][item]["terms"][year] = statusList.reduce(
            (cat, key, index) => {
              cat[key] = [];
              return cat;
            },
            {}
          );
        }
      }
    }

    // Write to data
    setData(copy);
    await saveData(copy);
  };

  // Return the provider information
  return (
    <DataContext.Provider
      value={{
        addItem,
        updateItem,
        archiveItem,
        toggleCompleted,
        updateStatusCategory,
        updateItemTerms,
        data,
        setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
