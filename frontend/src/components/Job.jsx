import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from "./ui/badge";
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';


const Job = ({job}) => {
  const navigate=useNavigate()
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime)
    const currentTime=new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60))
  }
  // const daysAgo=daysAgoFunction(job.createdAt)
  const daysAgo = daysAgoFunction(job?.createdAt);

  return (

    <div className="bg-white p-5 border border-gray-200 shadow-xl rounded-md">
        <div className="flex items-center justify-between">
        <p className='text-sm text-gray-600'>{daysAgo==0 ?"Today":`${daysAgo} Days ago`} </p>
        <Button variant='outline' size='icon' className=" rounded-full cursor-pointer"> <Bookmark/></Button>
        </div>

        <div className="flex items-center gap-2 my-4 ">

        <Button size='icon' variant="outline" className='p-1'>
            <Avatar>
                <AvatarImage src={job?.company.logo} alt="@shadcn" />
            </Avatar>
        </Button>
        <div>
            <h1 className="text-lg font-medium">{job?.company?.name}</h1>
            <p className='text-sm text-gray-600'>India</p>
        </div> 
        </div>
        <div>
            <h1 className="font-bold text-lg my-2 ">{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className="flex gap-2 mt-4 items-center">
        
        <Badge className="text-blue-700 font-bold rounded-full mr-1" variant="ghost">{job?.position} </Badge>
        <Badge className="text-[#F83002] font-bold rounded-full mr-1" variant="ghost">{job?.jobType} </Badge>
        <Badge className="text-[#7209b7] font-bold rounded-full mr-1" variant="ghost">{job.salary} </Badge>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outline" className=" cursor-pointer text-black rounded-full" onClick={()=>navigate(`/description/${job?._id}`)}>Details </Button>
        <Button variant='outline'className='text-[#7209b7] rounded-full cursor-pointer'> Save For Later</Button>
      </div>
    </div>
  )
}

export default Job