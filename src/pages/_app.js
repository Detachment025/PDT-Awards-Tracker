// CSS Import
import "@/styles/globals.css";

// React.js & Next.js libraries
import React, { useState, useEffect, useContext } from "react";

// Cookies
import Cookies from "js-cookie";

// Custom import
import { DataProvider, DataContext } from "@/utils/data";
import { getYear } from "@/utils/years";

// New component
function MyApp({ Component, pageProps }) {
  // Get functions provided by the data context
  const { data, updateItemTerms } = useContext(DataContext);

  // UseState Definition
  const [currentYear, setCurrentYear] = useState(getYear());

  // Set the data and reset Cookies
  useEffect(() => {
    // Reset data and cookies
    if (typeof window !== "undefined") {
      Cookies.set("selectedTracker", "Awards");
      Cookies.set("dataPresence", false);
    }
  }, []);

  // Checker to see if the academic year has changed
  useEffect(() => {
    // Function to check the year
    const checkYear = () => {
      // Get the current date
      if (getYear() > currentYear && Object.keys(data).length != 0) {
        // Set the current year
        setCurrentYear(getYear());

        // Update the items
        updateItemTerms(getYear());
      }
    };

    // Run the check immediately on mount
    checkYear();

    // Then run the check every hours
    const intervalId = setInterval(checkYear, 1000);

    // Clear the interval on unmount
    return () => clearInterval(intervalId);
  }, [currentYear, data]);

  // Return components
  return <Component {...pageProps} />;
}

// App definition
export default function App({ Component, pageProps }) {
  // Return components
  return (
    <DataProvider>
      <MyApp Component={Component} pageProps={pageProps} />
    </DataProvider>
  );
}
