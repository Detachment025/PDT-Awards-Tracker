// Custom components
import PageTitle from "@/components/functionality/pagetitle";
import Sidebar from "@/components/functionality/sidebar";
import { config } from "@/config/config";

// Toaster Components and CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Next.js and React.js libraries
import Image from "next/image";
import { useState } from "react";

// Asset import
import pfp from "../../public/BenPFP.jpg";

export default function ViewPage() {
  // Define useState for the data
  const [tracker, setTracker] = useState(Object.keys(config)[0]);

  // Render /info page
  return (
    <div className="relative flex flex-row h-screen">
      <Sidebar setOutsideTracker={setTracker} />
      <div className="flex flex-col w-full m-10">
        <PageTitle className="flex-none" />
        <div className="flex flex-col justify-center items-center align-center gap-4 h-screen">
          <div className="text-5xl">App Developed By</div>
          <div className="w-64 h-64 relative mt-10">
            <Image
              src={pfp}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="text-7xl mb-10">Benjamin Herrera</div>
          <div className="flex flex-col gap-1 justify-center mt-5">
            <div className="text-3xl">Questions? Contact Me!</div>
            <div className="flex flex-row gap-1 justify-center">
              <div className="font-bold">Discord -</div>
              <div className="">@bherrera</div>
            </div>
            <div className="flex flex-row gap-1 justify-center">
              <div className="font-bold">Email -</div>
              <div className="">b10@asu.edu</div>
            </div>
            <div className="flex flex-row gap-1 justify-center">
              <div className="font-bold">GitHub -</div>
              <div className="">BenjaminHerrera</div>
            </div>
          </div>
        </div>
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
  );
}
