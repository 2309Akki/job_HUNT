import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

// const randomJob=[1,2,3]
const Browse = () => {
    useGetAllJobs()
    const {allJobs}=useSelector(store=>store?.job)
    const dispatch=useDispatch()
    useEffect(()=>{
        return()=>{
            dispatch(setSearchedQuery(""))
        }
    },[])
  return (
    <div >
        <Navbar/>
            <div className="p-4 mx-auto max-w-7xl my-10">

        <h1 className='font-bold text-xl my-10'>Search Result {allJobs.length}</h1>
        <div className="grid grid-cols-3 gap-4">
            {
                allJobs.map((job,index)=>(
                    <Job key={job._id} job={job}/>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default Browse