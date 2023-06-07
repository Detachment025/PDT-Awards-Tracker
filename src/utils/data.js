// Next.js import functionalities
import React, { useContext, createContext, useState, useEffect } from 'react';

// Date functionalities import
const moment = require('moment');

// Create context for the data
export const DataContext = createContext();

// Create a data provider
export const DataProvider = ({ children }) => {
  // Create useState for the data
  const [data, setData] = useState({});

  // Insert award/pdt item
  const addItem = (
    itemType, 
    name, 
    statusList, 
    usafa, 
    jnac, 
    completed,
    startYear,
    endYear
  ) => {
    // Copy data
    var copy = data;

    // If endYear is NaN, set endYear to null and tempEndYear to current year
    var tempEndYear = endYear;
    if (isNaN(endYear)) {
      tempEndYear = moment().year();
      endYear = null;
    }

    // Generate list of years
    const years = [];
    for (let year = tempEndYear; (tempEndYear - (tempEndYear - startYear)) <= year; year--)
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
        completed: completed
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
          return cat
        }, {});
        return year;
      }, {})
    };

    // Write to data
    setData(copy);
  }

  // Update award/pdt item
  const updateItem = (
    itemType, 
    name, 
    statusList,
    usafa,
    jnac,
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
    for (let year = moment().year(); (moment().year() - 18) < year; year--)
      years.push(year);

    // If the start year is less than the original start year, add more years
    const originalStartYear = parseInt(copy[itemType.toLowerCase()][name]["startYear"]);
    if (startYear < originalStartYear) {
      for (let year = originalStartYear; year >= startYear; year--) {
        orgTerms[year.toString()] = statusList.reduce((cat, key, index) => {
          cat[key] = [];
          return cat
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
        completed: completed
      },
      initARMS: {
        month: srcDocument.getElementById("ARMSMonth").value,
        year: srcDocument.getElementById("ARMSYear").value,
      },
      rosterDOT: {
        month: srcDocument.getElementById("DOTMonth").value,
        year: srcDocument.getElementById("DOTYear").value,
      },
      terms: orgTerms
    };

    console.log(copy)

    // Write to data
    setData(copy);
  }

  // Delete award/pdt item
  const deleteItem = (itemType, name) => {
    // Copy data
    var copy = data;

    // Delete item and write to data
    delete copy[itemType.toLowerCase()][name];
    setData(copy);
  }

  // Toggle completed status of an item
  const toggleCompleted = (itemType, name, setCompleted) => {
    // Copy data and original terms
    var copy = data;

    // Update completed status
    copy[itemType.toLowerCase()][name]["tags"]["completed"] = !copy[itemType.toLowerCase()][name]["tags"]["completed"];

    // Write to data
    setCompleted(copy[itemType.toLowerCase()][name]["tags"]["completed"]);
    setData(copy);
  }

  // Update a statusCategory
  const updateStatusCategory = (itemType, itemName, year, statusCategory, changes) => {
    // Copy data and original terms
    var copy = data;

    // Update completed status
    copy[itemType.toLowerCase()][itemName]["terms"][year][statusCategory] = changes;

    // Write to data
    setData(copy);
  }
  
  // Return the provider information
  return (
    <DataContext.Provider 
      value={{ 
        addItem, 
        updateItem, 
        deleteItem, 
        toggleCompleted, 
        updateStatusCategory, 
        data,
        setData 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};