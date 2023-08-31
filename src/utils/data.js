// Next.js import functionalities
import React, { createContext, useState, useEffect } from "react";

// Import year function(s)
import { getYear } from "./years";

// Util imports
import { titleize } from "@/utils/stringUtils";

// Create context for the data
export const DataContext = createContext();

// Create a data provider
export const DataProvider = ({ children }) => {
  // Create useState for the data
  const [data, setData] = useState({});

  // Hook to save the data from the datapath
  useEffect(() => {
    // Define an async function
    async function fetchData() {
      const response = await fetch("/api/get_data");
      const result = await response.json();
      setData(result);
    }

    // Call the async function
    fetchData();
  }, []);

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

  // Get a six-year report of the data
  const getSixYear = (itemType) => {
    // Create a copy of the data
    const copy = { ...data };

    // Filter itemType
    itemType = itemType.toLowerCase();

    // Fetch the items to be processed
    const iterItems = Object.keys(copy[itemType]);

    // Build status category tracker map
    var statusCategoryMap = [];
    for (var item of iterItems) {
      var statusCategoryMap = [
        ...new Set([
          ...statusCategoryMap,
          ...copy[itemType][item].statusCategories,
        ]),
      ];
    }

    // Iterate through the items and structure them for the CSV content to build
    // CSV content
    var pages = {};
    for (var page of statusCategoryMap) {
      // Build max map for padding
      var maxMap = {};
      for (var year = getYear(); year >= getYear() - 6; year--) {
        var maxItems = 0;
        for (var item of iterItems) {
          const iterValue = copy[itemType][item]["terms"];
          if (!(year in iterValue)) continue;
          if (iterValue[year][page].length > maxItems)
            maxItems = iterValue[year][page].length;
        }
        maxMap[year] = maxItems;
      }

      // Iterate for the content of that page
      var content = [];
      for (var item of iterItems) {
        // Reset rowContent
        var rowContent = [item];

        // Iterate through a six year period and get the max
        for (var year = getYear(); year >= getYear() - 6; year--) {
          // If the year is empty, add an empty cell
          if (!(year.toString() in copy[itemType][item]["terms"])) {
            rowContent.push("");
            continue;
          }

          // If not, append with pad for the year
          var yearIter = [...copy[itemType][item]["terms"][year][page]];
          const padCount = (maxMap[year] || 1) - yearIter.length;
          for (var i = 0; i < padCount; i++) yearIter.push("");

          // Concatenate row
          rowContent = [...rowContent, ...yearIter];
        }

        // Concatenate row content to content
        content.push(rowContent);
      }

      // Build header for the content
      var header = [titleize(itemType)];
      for (var year = getYear(); year >= getYear() - 6; year--) {
        var rowContent = [year.toString()];
        for (var i = 0; i < maxMap[year] - 1; i++) rowContent.push("");
        header = [...header, ...rowContent];
      }

      // Compile page
      pages[page] = { header: header, content: content };
    }

    // Return the pages
    return pages;
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
    // console.log("addItem");
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

    // Save the current six year history
    var pages = getSixYear("Awards");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: pages, tracker: "awards" }),
    });
    pages = getSixYear("PDTs");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: pages, tracker: "pdts" }),
    });
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
    // console.log("updateItem");
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

    // Save the current six year history
    var pages = getSixYear("Awards");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: pages, tracker: "awards" }),
    });
    pages = getSixYear("PDTs");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: pages, tracker: "pdts" }),
    });
  };

  // Delete award/pdt item
  const archiveItem = async (itemType, name) => {
    // console.log("archiveItem");
    // Copy data
    var copy = data;

    // Set the end year to current year
    copy[itemType][name]["endYear"] = getYear();

    // Save the data
    setData(copy);
    await saveData(copy);

    // Save the current six year history
    var pages = getSixYear("Awards");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: pages, tracker: "awards" }),
    });
    pages = getSixYear("PDTs");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: pages, tracker: "pdts" }),
    });
  };

  // Toggle completed status of an item
  const toggleCompleted = async (itemType, name, setCompleted) => {
    // console.log("toggleCompleted");
    // Copy data and original terms
    var copy = data;

    // Update completed status
    copy[itemType.toLowerCase()][name]["tags"]["completed"] =
      !copy[itemType.toLowerCase()][name]["tags"]["completed"];

    // Write to data
    setCompleted(copy[itemType.toLowerCase()][name]["tags"]["completed"]);
    setData(copy);
    await saveData(copy);

    // Save the current six year history
    var pages = getSixYear("Awards");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: pages, tracker: "awards" }),
    });
    pages = getSixYear("PDTs");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: pages, tracker: "pdts" }),
    });
  };

  // Update a statusCategory
  const updateStatusCategory = async (
    itemType,
    itemName,
    year,
    statusCategory,
    changes
  ) => {
    // console.log("updateStatusCategory");
    // Copy data and original terms
    var copy = data;

    // Update completed status
    copy[itemType.toLowerCase()][itemName]["terms"][year][statusCategory] =
      changes;

    // Write to data
    setData(copy);
    await saveData(copy);

    // Save the current six year history
    var pages = getSixYear("Awards");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"data": pages, tracker: "awards"}),
    });
    pages = getSixYear("PDTs");
    await fetch("/api/write_xlsx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"data": pages, tracker: "pdts"}),
    });
  };

  // Update the terms for every item
  const updateItemTerms = async (year) => {
    // console.log("updateItemTerms");
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
          if (!(year in copy[tracker][item]["terms"])) {
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
    }

    // Write to data
    setData(copy);
    await saveData(copy);
  };

  // Return the provider information
  return (
    <DataContext.Provider
      value={{
        saveData,
        getSixYear,
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
