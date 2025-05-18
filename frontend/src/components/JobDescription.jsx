import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSingleJobs } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const {user}=useSelector(store=>store.auth)
  const isInitiallyApplied = singleJob?.application?.some(app => app.applicant === user?._id) || false;
  const [loading, setLoading] = useState(false);

  const [isApplied,setIsApplied]=useState(isInitiallyApplied)

  const params=useParams();
    const jobId=params.id;
   
    const dispatch=useDispatch()
    
const applyJobHandler=async()=>{
  setLoading(true);
  try {
    const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });
    if(res.data.success){
      setIsApplied(true)
      const updatedSingleJob={...singleJob,application:[...singleJob.application,{applicant:user?._id}]}
      dispatch(setSingleJobs(updatedSingleJob))
      toast.success(res.data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.message );
  }
  finally {
    setLoading(false);
  }
}
// useEffect(() => {
//   if (singleJob && user?._id) {
//     setIsApplied(singleJob.application?.some(app => app.applicant === user._id));
//   }
// }, [singleJob, user?._id]);

    useEffect(()=>{
      const fetchSingleJobs=async ()=>{
          try {
              const res= await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
              if(res.data.success){
                  dispatch(setSingleJobs(res.data.job))
                  setIsApplied(res.data.job.application?.some(application => application.applicant === user?._id));
                }
          } catch (error) {
              console.log(error);
              
          }
      }
      fetchSingleJobs();
    },[jobId,dispatch,user?._id])


  return (
    <div className="max-w-7xl mx-auto my-15">
      <div className="flex justify-between">
        <div>
              <h1 className="font-bold text-3xl ">{singleJob?.title || "Job Title"}</h1>
          <div className="flex gap-2 mt-4 items-center">
            <Badge
              className="text-blue-700 font-bold rounded-full mr-1"
              variant="ghost"
            >
               {singleJob?.position || "Position"}
            </Badge>
            <Badge
              className="text-[#F83002] font-bold rounded-full mr-1"
              variant="ghost"
            >
             {singleJob?.jobType || "Job Type"}
            </Badge>
            <Badge
              className="text-[#7209b7] font-bold rounded-full mr-1"
              variant="ghost"
            >
             {singleJob?.salary ? `${singleJob.salary} LPA` : "Salary"}
            </Badge>
          </div>
        </div>
        <Button 
  onClick={isApplied || loading ? null : applyJobHandler} 
  disabled={isApplied || loading}
  className={`rounded-xl ${isApplied ? "cursor-not-allowed bg-gray-600" : "bg-[#7209b7] hover:bg-[#5f32ad] cursor-pointer"}`}
>
  {isApplied ? "Already applied" : loading ? "Applying..." : "Apply Now"}
</Button>
      </div>
      <h1 className="text-xl font-medium py-4 border-b-2 border-b-gray-300">Job Description</h1>
      <div className="my-4 ">
        <h1 className="font-bold my-1">Role:<span className="pl-4 font-normal text-gray-700">{singleJob?.title}</span></h1>
        <h1 className="font-bold my-1">Location:<span className="pl-4 font-normal text-gray-700">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1">Description:<span className="pl-4 font-normal text-gray-700">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1">Experience:<span className="pl-4 font-normal text-gray-700">{singleJob?.experienceLevel} yrs</span></h1>
        <h1 className="font-bold my-1">Salary:<span className="pl-4 font-normal text-gray-700">{singleJob?.salary} LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicants:<span className="pl-4 font-normal text-gray-700">{singleJob?.application?.length || 0}</span></h1>
        <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-700">{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
