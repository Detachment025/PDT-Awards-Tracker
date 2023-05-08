// CSS Import
import '@/styles/globals.css'

// React.js & Next.js libraries
import React, { useEffect } from 'react';

// App definition
export default function App({ Component, pageProps }) {

  // Set the data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }

    localStorage.setItem("data", localStorage.getItem("data") || JSON.stringify({}));
  }, []);
  
  // Return components
  return (<Component {...pageProps} />);
}
