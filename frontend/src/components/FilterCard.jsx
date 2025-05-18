import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
    {
        filterType:"Location",
        array:['Delhi','Banglore','Mumbai', 'Hyderbad','Pune']
    },
    {
        filterType:"Salary",
        array:['0-40k','41-100k','100 and above']
    },
    {
        filterType:"Industry",
        array:['Frontend Developer','Backend Developer','Fullstack Developer']
    }
];

const FilterCard = () => {
    const [selectedValue,setSelectedValue]=useState("")
    const dispatch=useDispatch()
    const changeHandler=(value)=>{
        setSelectedValue(value)
    }
    useEffect(()=>{
        // console.log(selectedValue); 
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue])
  return <div>
    <h1 className="font-bold mb-2 text-lg">Filter Jobs</h1>
    <hr />
    <RadioGroup value={selectedValue} onValueChange={changeHandler}  >
        {

            filterData.map((data,index)=>{
                 const id1 = `${index === 0 ? 'first-filter' : data.filterType}-${data}`
                return (
               

                <div key={id1} >
                <h1 className="font-bold mb-2 mt-3">{data.filterType}</h1>
               
                {
                    data.array.map((item,index)=>{
                        const id = `${data.filterType}-${item}`;
                        return(
                            <div className="flex items-center  space-x-2 ml-3">
                                <RadioGroupItem id={id} value={item}  />
                  <Label htmlFor={id} className="cursor-pointer " >
                    {item}
                  </Label>
                            </div>
                        )
                    })
                }
                 
              </div>  
            )})
        }
        </RadioGroup>
   
  </div>;
};

export default FilterCard;

// import { Label } from "@radix-ui/react-label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import React from "react";

// const filterData = [
//   {
//     filterType: "Location",
//     array: ["Delhi", "Bangalore", "Mumbai", "Hyderabad", "Pune"],
//   },
//   {
//     filterType: "Salary",
//     array: ["0-40k", "41-100k", "100k and above"],
//   },
//   {
//     filterType: "Industry",
//     array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
//   },
// ];

// const FilterCard = () => {
//   return (
//     <div className="p-4 border rounded-md shadow-md">
//       <h1 className="text-lg font-semibold mb-2">Filter Jobs</h1>
//       <hr className="mb-4" />

//       {filterData.map((data, index) => (
//         <div key={index} className="mb-4">
//           <h2 className="text-md font-medium mb-2">{data.filterType}</h2>
//           <RadioGroup className="flex flex-col gap-2">
//             {data.array.map((item, i) => {
//               const id = `${data.filterType}-${item.replace(/\s/g, "-")}`; // Unique id
//               return (
//                 <div key={id} className="flex items-center space-x-2">
//                   <RadioGroupItem value={item} id={id} />
//                   <Label htmlFor={id}>{item}</Label>
//                 </div>
//               );
//             })}
//           </RadioGroup>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterCard;
