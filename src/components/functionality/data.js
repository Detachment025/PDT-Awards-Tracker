// Date functionalities import
const moment = require('moment');

// Get data information
export function getData() {
  return JSON.parse(localStorage.getItem("data"));
}

// Insert award/pdt item
export function addItem(itemType, name, statusList, usafa, jnac, completed) {
  // Copy data
  var data = getData();

  // Generate 18 years for the terms starting from 
  // the 18th year prior to current year
  const years = [];
  for (let year = moment().year(); (moment().year() - 18) < year; year--)
    years.push(year);

  // Get append new information to the data
  data[itemType.toLowerCase()][name] = {
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

  // Write to localStorage and set useState
  localStorage.setItem("data", JSON.stringify(data));
}

// Update award/pdt item
export function updateItem(
  itemType, 
  name, 
  statusList,
  usafa,
  jnac,
  completed,
  original,  
  srcDocument
) {
  // Copy data and original terms
  var data = getData();
  const orgTerms = data[itemType.toLowerCase()][original]["terms"];

  // Generate 18 years for the terms starting from 
  // the 18th year prior to current year
  const years = [];
  for (let year = moment().year(); (moment().year() - 18) < year; year--)
    years.push(year);

  // Delete award or pdt item
  delete data[itemType.toLowerCase()][original];

  // Get append new information to the data
  data[itemType.toLowerCase()][name] = {
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

  // Write to localStorage and set useState
  localStorage.setItem("data", JSON.stringify(data));
}

// Delete award/pdt item
export function deleteItem(itemType, name) {
  // Copy data
  var data = getData();

  // Delete item and write to localStorage
  delete data[itemType.toLowerCase()][name];
  localStorage.setItem("data", JSON.stringify(data));
}

// Update completed status of an item
export function toggleCompleted(itemType, name, setCompleted) {
  // Copy data and original terms
  var data = getData();

  // Update completed status
  data[itemType.toLowerCase()][name]["tags"]["completed"] = !data[itemType.toLowerCase()][name]["tags"]["completed"];

  // Write to localStorage and set useState
  setCompleted(data[itemType.toLowerCase()][name]["tags"]["completed"]);
  localStorage.setItem("data", JSON.stringify(data));
}