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
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CompaniesTable = () => {
  const {companies,searchCompanyByText} = useSelector((store) => store.company) || [];
  const [filterCompany,setFilterCompany]=useState(companies)
  const navigate=useNavigate();
  useEffect(()=>{
    const filteredCompany=companies.length>=0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      };
      return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())

    })
    setFilterCompany(filteredCompany)
  },[companies,searchCompanyByText])

  return (
    <div>
      <Table className="w-full min-w-[900px] text-base">
        <TableCaption>List of your recent register companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                You haven't registered any companies yet!
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filterCompany?.map((company) => {
                return (
                  <TableRow key={company._id} className="table-auto border-collapse border-none w-full">
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          size="icon"
                          variant="outline"
                          className="p-1 h-15 w-15"
                          src={company.logo} 
                          alt="@shadcn"
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name} </TableCell>
                    <TableCell>{company.createdAt?.split("T")[0]} </TableCell>
                    <TableCell className=" cursor-pointer text-right">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-23  p-2 border border-gray-200 shadow-md ">
                          <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex  items-center w-fit gap-1 hover:bg-gray-100 p-2 rounded cursor-pointer ">
                            <Edit2 className="w-4" />
                            <span className="inline-block">Edit</span>
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

export default CompaniesTable;
