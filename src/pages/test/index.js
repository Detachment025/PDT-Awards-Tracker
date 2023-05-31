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
import styles from './Home.module.css';

const items = [
  { "id": 1, "name": "Item 1", "options": { "option1": true, "option2": true, "completed": false } },
  { "id": 2, "name": "Item 2", "options": { "option1": true, "option2": false, "completed": true } },
  { "id": 3, "name": "Item 3", "options": { "option1": false, "option2": true, "completed": false } },
  { "id": 4, "name": "Item 4", "options": { "completed": true } }
];

export default function Home() {
  const [filter, setFilter] = useState({ option1: true, option2: true });
  const [displayItems, setDisplayItems] = useState(items);

  useEffect(() => {
    const filteredItems = items.filter(item => 
      Object.keys(item.options).length === 0 || 
      Object.keys(filter).some(option => item.options[option] && filter[option])
    );

    setDisplayItems(filteredItems);
  }, [filter]);

  const handleFilterChange = (option) => {
    setFilter(prevFilter => ({ ...prevFilter, [option]: !prevFilter[option] }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Filter Items</h1>

      <div className={styles.filters}>
        <label className={styles.filter}>
          <input 
            type="checkbox"
            checked={filter.option1}
            onChange={() => handleFilterChange('option1')}
          />
          Option 1
        </label>

        <label className={styles.filter}>
          <input 
            type="checkbox"
            checked={filter.option2}
            onChange={() => handleFilterChange('option2')}
          />
          Option 2
        </label>
      </div>

      <ul className={styles.items}>
        {displayItems.map(item => (
          <li key={item.id} className={styles.item}>
            {item.name} {item.options.completed && "(Completed)"}
          </li>
        ))}
      </ul>
    </div>
  );
}