// Function to map term to year
export function relativeToAbsoluteYear (year) {
  // Get current year
  const currentYear = getYear();

  // Parse delta
  const delta = parseInt(year.replace("AY-", ""));

  // Return the absolute year
  return(currentYear - (isNaN(delta) ? 0 : delta ));
}

// Function to map term to year
export function absoluteToRelativeYear (year) {
  // Get current year
  const currentYear = getYear();

  // Parse delta
  const delta = currentYear - year

  // Return the absolute year
  return("AY-" + delta);
}

// Function that gets the current year
export function getYear() {
  // get current date
  const date = new Date();

  // get current year
  let year = date.getFullYear();

  // if the date is before August 1, return the previous year
  if (date.getMonth() < 7) {
    year -= 1;
  }

  // Return the year
  return year;
}