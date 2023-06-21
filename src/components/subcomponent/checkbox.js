// React imports
import React, { useState } from "react";

// Checkbox definitions
export function CheckboxComponent({ state, setState }) {
  // Define a function that handles the click of the check button
  const handleCheckboxChange = () => {
    setState(!state);
  };

  // Render the contents
  return (
    <div className="flex items-center">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            checked={state}
            onChange={handleCheckboxChange}
            className="sr-only" // Hide the default checkbox
          />
          <div className="block bg-white w-6 h-6 border-2"></div>
          <div
            className={
              `dot absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3
              transition-all duration-200 ease-in-out ${state ? 'bg-gray-600' : 'bg-transparent'}`
            }
          />
        </div>
      </label>
    </div>
  );
}