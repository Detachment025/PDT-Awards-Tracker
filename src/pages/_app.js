// CSS Import
import '@/styles/globals.css'

// React.js & Next.js libraries
import React, { useContext, useEffect } from 'react';

// Cookies 
import Cookies from 'js-cookie';

// Custom import
import { DataProvider, DataContext } from '@/utils/data';

// App definition
export default function App({ Component, pageProps }) {
  // Set the data and reset Cookies
  useEffect(() => {
    // Reset data and cookies
    if (typeof window !== 'undefined') {
      Cookies.set("selectedTracker", "Awards");
      Cookies.set("dataPresence", false);
    }
  }, []);
  
  // Return components
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
