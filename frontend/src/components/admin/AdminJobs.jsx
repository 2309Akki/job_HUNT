import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { setSearchCompanyByText } from "@/redux/companySlice";

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input,setInput]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(setSearchJobByText(input))
    dispatch(setSearchCompanyByText(input))
  },[input])


 
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between">
          <Input className="w-fit " onChange={(e)=>setInput(e.target.value)} placeholder="Filter by name" />
          <Button onClick={()=>navigate("/admin/job/create")} className="text-white bg-black ">New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
