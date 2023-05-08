// Import
import { ToastContainer, toast } from 'react-toastify';

// Function for success toaster
export const SuccessToaster = (message, position="top-right") => {
    // Toast execution
    toast.success(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}

// Function for info toaster
export const InfoToaster = (message, position="top-right") => {
    // Toast execution
    toast.info(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}

// Function for error toaster
export const ErrorToaster = (message, position="top-right") => {
    // Toast execution
    toast.error(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
}