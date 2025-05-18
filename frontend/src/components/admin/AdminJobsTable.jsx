import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




const AdminJobsTable = () => {
  const {searchCompanyByText} = useSelector((store) => store.company) || [];
  const {allAdminJobs,searchJobByText}=useSelector(store=>store.job)
  const [filterJobs,setFilterJobs]=useState(allAdminJobs)
  const navigate=useNavigate();
  
  useEffect(()=>{
    const filteredJobs=allAdminJobs.length>=0 && allAdminJobs.filter((job)=>{
      if(!searchJobByText){
        return true;
      };
      return job.title.toLowerCase().includes(searchJobByText.toLowerCase()) || job.company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())

    })
    setFilterJobs(filteredJobs)
  },[allAdminJobs,searchJobByText,searchCompanyByText])

  return (
    <div>
      <Table className="w-full min-w-[900px] text-base">
        <TableCaption>List of your recent Posted jobs </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAdminJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                You haven't registered any companies yet!
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filterJobs?.map((job) => {
                return (
                  <TableRow key={job._id} className="table-auto border-collapse border-none">
                    <TableCell>{job.company.name} </TableCell>
                    <TableCell>{job.title} </TableCell>
                    <TableCell>{job.createdAt?.split("T")[0]} </TableCell>
                    <TableCell className=" cursor-pointer text-right">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-fit  p-2 border border-gray-200 shadow-md ">
                          <div onClick={()=>navigate(`/admin/companies/${job ._id}`)} className="flex  items-center w-fit gap-1 hover:bg-gray-100 p-2 rounded cursor-pointer ">
                            <Edit2 className="w-4" />
                            <span className="inline-block">Edit</span>
                          </div>
                          <div onClick={()=>navigate(`/admin/job/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer">
                            <Eye className="w-4"/>
                            <span>Applicant</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
