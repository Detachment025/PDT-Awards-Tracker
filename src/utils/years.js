// Date functionalities import
const moment = require('moment');

// Function to map term to year
export function relativeToAbsoluteYear (year) {
  // Get current year
  const currentYear = moment().year()

  // Parse delta
  const delta = parseInt(year.replace("CY-", ""));

  // Return the absolute year
  return(currentYear - (isNaN(delta) ? 0 : delta ));
}

// Function to map term to year
export function absoluteToRelativeYear (year) {
  // Get current year
  const currentYear = moment().year()

  // Parse delta
  const delta = currentYear - year

  // Return the absolute year
  return("CY-" + delta);
}