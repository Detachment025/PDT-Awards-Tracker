// Custom components
import DataCheck from '@/components/functionality/datacheck';
import PageTitle from '@/components/functionality/pagetitle';
import Sidebar from '@/components/functionality/sidebar';
import AddEditComponent from './add_edit';
import { config } from '@/config/config';

// Toaster Components and CSS
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React.js libraries
import { useEffect, useState } from 'react';

// Import cookie
import Cookies from 'js-cookie';

export default function AddPage() {
  // Define useState for the data
  const [finish, setFinish] = useState();
  const [tracker, setTracker] = useState(Object.keys(config)[0]);
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
        <AddEditComponent
          tracker={tracker.toLowerCase()}
        />
      )
    }
  }, [finish, tracker]);

  // Render /view page
  return (
    <div className="relative flex flex-row h-screen">
      <Sidebar setOutsideTracker={setTracker}/>
      <div className="flex flex-col w-full m-10">
        <PageTitle customName={`Add or Edit ${tracker}`} className="flex-none"/>
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
