// Custom components
import DataCheck from '@/components/datacheck';
import PageTitle from '@/components/pagetitle';
import Sidebar from '@/components/sidebar';

// Next.js libraries
import { useRouter } from 'next/router';

// Toaster Components and CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPage() {
  // Variable declaration and initialization
  const router = useRouter();

  return (
    <div className="relative flex flex-row h-screen">
      <Sidebar/>
      <div className="m-10 w-full">
        <PageTitle/>    
        <DataCheck/>
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
