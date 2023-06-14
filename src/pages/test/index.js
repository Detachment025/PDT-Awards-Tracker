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

import React from 'react';

const Table = () => {
  const data = [
    ['a1', 'b1', 'c1', 'd1', 'e1'],
    ['a2', 'b2', 'c2', 'd2', 'e2'],
    ['a3', 'b3', 'c3', 'd3', 'e3'],
    ['a4', 'b4', 'c4', 'd4', 'e4'],
    // ... more rows
  ];

  const headers = ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'];

  return (
    <div className="overflow-auto rounded-lg shadow-lg max-w-md mx-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{cell}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;