// import React, { useState } from 'react';
// import { FaRegHeart, FaHeart } from 'react-icons/fa';

// function App() {
//   const [isToggled, setIsToggled] = useState(false);

//   const handleClick = () => {
//     setIsToggled(!isToggled);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button onClick={handleClick} className="transition duration-500 ease-in-out">
//         {isToggled ? (
//           <FaHeart className="text-red-500 hover:text-red-600 text-6xl" />
//         ) : (
//           <FaRegHeart className="text-gray-500 hover:text-gray-600 text-6xl" />
//         )}
//       </button>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';

const MyComponent = () => {
  const data = {
    "key1": { "tag": "tag1", "otherData": "..." },
    "key2": { "tag": "tag2", "otherData": "..." },
    "key3": { "tag": "tag1", "otherData": "..." },
    // ...
  };

  const [filter, setFilter] = useState('tag1'); // initially set to 'tag1'
  const [filteredKeys, setFilteredKeys] = useState([]);

  useEffect(() => {
    // When 'filter' changes, update 'filteredKeys'
    const newFilteredKeys = Object.keys(data).filter(key => data[key].tag === filter);
    setFilteredKeys(newFilteredKeys);
  }, [filter]);

  return (
    <div>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="tag1">Tag 1</option>
        <option value="tag2">Tag 2</option>
        {/* add more options as needed */}
      </select>

      <ul>
        {filteredKeys.map(key => <li key={key}>{key}</li>)}
      </ul>
    </div>
  );
}

export default MyComponent;