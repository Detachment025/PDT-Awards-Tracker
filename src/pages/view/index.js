// Custom components
import DataCheck from '@/components/datacheck';
import PageTitle from '@/components/pagetitle';
import Sidebar from '@/components/sidebar';
import ViewComponent from './view';

// Toaster Components and CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React.js libraries
import { useEffect, useState } from 'react';

// Import cookie
import Cookies from 'js-cookie';

export default function ViewPage() {
  // Define useState for the data
  const [finish, setFinish] = useState();
  const [tracker, setTracker] = useState();
  const [content, setContent] = useState(<DataCheck setFinish={setFinish}/>);

  // Set initial useState values 
  useEffect(() => {
    setFinish(Cookies.get("dataPresence"));
    setTracker(Cookies.get("selectedTracker"));
    setContent(<DataCheck setFinish={setFinish}/>);
  }, []);

  // Read the new data and pass it into the content useState
  useEffect(() => {
    if (finish === "true") {
      setContent(
        <ViewComponent 
          incomingData={JSON.parse(localStorage.getItem("data"))[tracker.toLowerCase()]}
          tracker={tracker}
        />
      )
    }
  }, [finish, tracker]);

  // Render /view page
  return (
    <div className="relative flex flex-row h-screen">
      <Sidebar setOutsideTracker={setTracker}/>
      <div className="flex flex-col w-full m-10">
        <PageTitle className="flex-none"/>  
        {content}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}
