import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
  const {allJobs,searchedQuery}=useSelector(store=>store.job)
  const [filterJobs,setFilterJobs]=useState()

  useEffect(()=>{
    if(searchedQuery){
      const filteredJobs=allJobs.filter(job=>{
         return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) 
         || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) 
         || job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    }else{
      setFilterJobs(allJobs)
    }
  },[allJobs,searchedQuery])
  return (
    <div>
      <Navbar />
      <div className="mt-5 max-w-7xl mx-auto flex gap-5">
        <div className="w-20%">
          <FilterCard />
        </div>

        {filterJobs?.length <= 0 ? (
          <span>Jobs Not Found</span>
        ) : (
          <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {
              filterJobs?.map((item, index) => (
                <motion.div initial={{opacity:0}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-100}} transition={{duration:0.3}} key={item._id}>
                  <Job job={item} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
