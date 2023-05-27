// React Icons
import { 
  VscError
} from 'react-icons/vsc';
import { IconContext } from "react-icons";

export function Nothing ({ mainText, subText }) {
  // Return component content
  return(
    <div 
      className="h-full w-full flex flex-col items-center justify-center rounded-lg 
      border-2 border-dashed border-scarlet text-scarlet p-6"
    >
      <IconContext.Provider value={{size: "5em", className: "mb-3"}}>
        <VscError/>
      </IconContext.Provider>
      <div className="text-xl">
        {mainText}
      </div>
      <div className="flex text-md items-center justify-center">
        {subText}
      </div>
    </div> 
  );
}