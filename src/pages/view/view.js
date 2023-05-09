// React.js libraries
import { useEffect, useState } from 'react';

// Cookies libraries
import Cookies from 'js-cookie';

// View functionality component definition
export default function ViewComponent({ tracker, incomingData }) {
  // Render the View functionality component 
  return(
    <div className="flex-1">
      {(tracker === "PDTs") ? <>{JSON.stringify(incomingData)}</> : <>{JSON.stringify(incomingData)}</>}
    </div>
  );
}