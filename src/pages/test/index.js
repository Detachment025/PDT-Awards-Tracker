import { BottomDropDown } from "@/components/subcomponent/dropdown";

const Table = () => {
  
  return(
    <div className="flex flex-col gap-4">
      <BottomDropDown
        listOfItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        setSelect={()=>{}}
        className="z-10"
      />
      <BottomDropDown
        listOfItems={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        setSelect={()=>{}}
        className="z-0"
      />
    </div>
  )

};

export default Table;