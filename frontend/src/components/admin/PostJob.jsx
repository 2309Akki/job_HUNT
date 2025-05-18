import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const companyArray = [1, 2, 3, 4, 5];
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/job");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(flase);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md "
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                onChange={changeEventHandler}
                value={input.title}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                onChange={changeEventHandler}
                value={input.description}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                onChange={changeEventHandler}
                value={input.requirements}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                onChange={changeEventHandler}
                value={input.salary}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                onChange={changeEventHandler}
                value={input.location}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                onChange={changeEventHandler}
                value={input.jobType}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                onChange={changeEventHandler}
                value={input.position}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Expirience Level</Label>
              <Input
                type="text"
                name="experience"
                onChange={changeEventHandler}
                value={input.experience}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              {companies.length >= 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem value={company.name?.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {loading ? (
            <Button className="w-full mt-5 bg-green-1000 text-white cursor-pointer flex justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Place Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-5 bg-green-400 text-white cursor-pointer flex justify-center"
            >
              Post New Job
            </Button>
          )}
          {companies.length == 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3 ">
              **Please register a company first before posting job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
