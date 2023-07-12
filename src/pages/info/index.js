// Custom components
import PageTitle from "@/components/functionality/pagetitle";
import Sidebar from "@/components/functionality/sidebar";
import { config } from "@/config/config";

// Toaster Components and CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UI Card Import
import { UserCard } from "react-ui-cards";

// React.js libraries
import { useEffect, useState } from "react";

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
          <div className="text-6xl">App Developed By</div>
          <UserCard
            float
            header="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Rxazg3dnowc29kZHJ5ZDgwZmc1N2w4M21ncGQwNmJnOXh6dDk1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XdisvmZhOxKt5bPbgP/giphy.gif"
            avatar="https://avatars.githubusercontent.com/u/43798089?v=4"
            name="Benjamin Herrera"
            positionName="CS Student @ ASU"
          />
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
