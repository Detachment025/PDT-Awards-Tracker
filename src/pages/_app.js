// CSS Import
import '@/styles/globals.css'

// React.js & Next.js libraries
import React, { useEffect } from 'react';

// Cookies 
import Cookies from 'js-cookie';

// App definition
export default function App({ Component, pageProps }) {

  // Set the data and reset Cookies
  useEffect(() => {
    // Reset data and cookies
    if (typeof window !== 'undefined') {
      Cookies.set("selectedTracker", "Awards");
      Cookies.set("dataPresence", false)
      window.localStorage.clear();
    }

    // Set data
    localStorage.setItem("data", localStorage.getItem("data") || JSON.stringify({}));
  }, []);
  
  // Return components
  return (<Component {...pageProps} />);
}
