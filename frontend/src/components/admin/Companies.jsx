import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetAllCompany from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  const [input,setInput]=useState("")
  const dispatch=useDispatch()
  useGetAllCompany();
  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])


 
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between">
          <Input className="w-fit " onChange={(e)=>setInput(e.target.value)} placeholder="Filter by name" />
          <Button onClick={()=>navigate("/admin/companies/create")} className="text-white bg-black ">New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
