import { BottomDropDown } from "@/components/subcomponent/dropdown";
import { useState } from "react";

const Table = () => {
  const [status, setStatus] = useState("");
  
  return(
    <div className="flex flex-col gap-4">
      <BottomDropDown
        listOfItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        setSelected={setStatus}
        defaultValue={"Select One"}
        z="999"
      />
      <BottomDropDown
        listOfItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        setSelected={setStatus}
        z="999"
      />
      <BottomDropDown
        listOfItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        setSelected={setStatus}
        z="999"
      />
    </div>
  )

};

export default Table;