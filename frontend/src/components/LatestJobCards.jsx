import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import React from "react";

const LatestJobCards = ({job}) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="rounded-md p-5 border border-gray-100 shadow-xl cursor-pointer">
      <div >
        <h1 className="text-lg font-medium">{job.company.name}</h1>
        <p className="text-gray-500 text-sm">India </p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600 ">
          {job.description}
        </p>
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <Badge className="text-blue-700 font-bold rounded-full mr-1" variant="ghost">{job.position} </Badge>
        <Badge className="text-[#F83002] font-bold rounded-full mr-1" variant="ghost">{job.jobType} </Badge>
        <Badge className="text-[#7209b7] font-bold rounded-full mr-1" variant="ghost">{job.salary} </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
