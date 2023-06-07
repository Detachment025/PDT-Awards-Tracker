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

import React, { useRef } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

export default function HomePage() {
  const divRef = useRef();

  const printDocument = () => {
    const input = divRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
      });
  }

  return (
    <div>
      <div ref={divRef}>
        This is the div that will be saved to a PDF.
      </div>

      <button onClick={printDocument}>Save to PDF</button>
    </div>
  );
}