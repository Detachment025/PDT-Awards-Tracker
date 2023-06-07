// import React, { useState } from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// const Heart = () => {
//   const [isHeartFilled, setHeartFilled] = useState(false);

//   const toggleHeart = () => {
//     setHeartFilled(!isHeartFilled);
//   }

//   return (
//     <div 
//       className="flex items-center justify-center h-screen"
//       onClick={toggleHeart}
//     >
//       {isHeartFilled ? <FaHeart className="text-red-500 text-9xl"/> : <FaRegHeart className="text-gray-500 text-9xl"/>}
//     </div>
//   );
// }

// export default Heart;

import { useState } from 'react';

export default function HomePage() {
  const [saveStatus, setSaveStatus] = useState(null);

  async function saveData() {
    const data = { key1: 'value1', key2: 'value2' }; // replace this with your actual data

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSaveStatus('Data saved successfully.');
      } else {
        setSaveStatus('Failed to save data.');
      }
    } catch (error) {
      setSaveStatus('Failed to save data.');
    }
  }

  return (
    <div>
      <button onClick={saveData}>Save Data</button>
      {saveStatus && <p>{saveStatus}</p>}
    </div>
  );
}