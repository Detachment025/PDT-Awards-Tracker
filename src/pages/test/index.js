import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

function App() {
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={handleClick} className="transition duration-500 ease-in-out">
        {isToggled ? (
          <FaHeart className="text-red-500 hover:text-red-600 text-6xl" />
        ) : (
          <FaRegHeart className="text-gray-500 hover:text-gray-600 text-6xl" />
        )}
      </button>
    </div>
  );
}

export default App;