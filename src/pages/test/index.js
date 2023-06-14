import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Heart = () => {
  const [isHeartFilled, setHeartFilled] = useState(false);

  const toggleHeart = () => {
    setHeartFilled(!isHeartFilled);
  }

  return (
    <div
      className="flex items-center justify-center h-screen"
      onClick={toggleHeart}
    >
      {isHeartFilled ? <FaHeart className="text-red-500 text-9xl"/> : <FaRegHeart className="text-gray-500 text-9xl"/>}
    </div>
  );
}

export default Heart;