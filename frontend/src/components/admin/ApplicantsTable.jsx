import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'


const shortlistingStatus=["Accepted","Rejected"]
const ApplicantsTable = () => {
    const {applicants}=useSelector(store=>store.application)
    const statusHandler=async (status,id)=>{
        try {
            const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.message)
        }
    }
  return (
    <div>
        <Table>
            <TableCaption>A List of your recent applied user</TableCaption>

            <TableHeader>
            <TableRow>
                <TableHead> FullName </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
            </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.application?.map((item)=>(
                            <tr key={item._id}>
                            <TableCell>{item.applicant.fullname}</TableCell>
                            <TableCell>{item.applicant.email}</TableCell>
                            <TableCell>{item.applicant.phoneNumber}</TableCell>
                            <TableCell >
                                {
                                  item.applicant.profile.resume?<a href={item.applicant.profile.resume} className='text-blue-600 cursor-pointer hover:border-b border-b-blue-300 ' >{item.applicant.profile.resumeOriginalName}</a>:<span className='text-red-300 cursor-pointer hover:border-b hover:border-b-red-500 hover:text-red-500 '>Na</span>
                                }
                            </TableCell>
                            <TableCell>{item.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className='cursor-pointer'/>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-32'>
                                    {
                                    shortlistingStatus.map((status,index)=>{
                                        return(
                                            <div onClick={()=>statusHandler(status,item?._id)} key={index} className='cursor-pointer'>
                                                    <span>{status}</span>
                                            </div>
                                        )
                                    })
                                }
                                    </PopoverContent>
                                </Popover>
                                
                            </TableCell>
                        </tr>
                        ))
                    }
                 
                </TableBody>
            
        </Table>

    </div>
  )
}

export default ApplicantsTable