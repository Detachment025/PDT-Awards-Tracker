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
  const addItem = (itemType, name, statusList, usafa, jnac, completed) => {
    // Copy data
    var copy = data;

    // Generate 18 years for the terms starting from 
    // the 18th year prior to current year
    const years = [];
    for (let year = moment().year(); (moment().year() - 18) < year; year--)
      years.push(year);

    // Get append new information to the data
    copy[itemType.toLowerCase()][name] = {
      id: name,
      completed: false,
      statusCategories: statusList,
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
    original,  
    srcDocument
  ) => {
    // Copy data and original terms
    var copy = data;
    const orgTerms = data[itemType.toLowerCase()][original]["terms"];

    // Generate 18 years for the terms starting from 
    // the 18th year prior to current year
    const years = [];
    for (let year = moment().year(); (moment().year() - 18) < year; year--)
      years.push(year);

    // Delete award or pdt item
    delete copy[itemType.toLowerCase()][original];

    // Get append new information to the data
    copy[itemType.toLowerCase()][name] = {
      id: name,
      completed: false,
      statusCategories: statusList,
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