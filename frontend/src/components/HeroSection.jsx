
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query,setQuery]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query))     
    navigate("/browse")
  }
  return (<>
    <div className='text-center flex flex-col gap-5 my-10'>
        <h1 className='px-4 py-2 rounded-full mx-auto mt-3 w-50 text-center bg-gray-100 text-[#F83002] font-medium'>No.  1 Job Hunt portal</h1>
        <h1 className='text-5xl font-bold'>Search, Apply &<br/>Get Your <span className="text-[#6A38C2] ">Dream job</span></h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos id modi architecto at natus.</p>
        <div className='flex justify-center items-center w-[40%] shadow-lg boarder boarder-gray-400 pl-3 rounded-full gap-4 mx-auto '>
            <input 
            type="text"
            onChange={(e)=>setQuery(e.target.value)}
            placeholder='Find your dream job'
            className='outline-none border-none w-full '
            />
            <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2] cursor-pointer ' ><Search className='text-white h-5 w-5'/>
            </Button>
        </div>
    </div>
  </>
  )
}

export default HeroSection