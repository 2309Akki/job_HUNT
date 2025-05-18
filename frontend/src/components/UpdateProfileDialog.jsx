// import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
// import React from "react";
// import { DialogHeader } from "./ui/dialog";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "./ui/input";

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   return (
//     <div>
//       <Dialog open={open}>
//         <DialogContent className="flex items-center justify-center fixed inset-0">
//           <DialogHeader>
//             <DialogTitle>Update Profile</DialogTitle>
//           </DialogHeader>
//           <form>
//             <div className='grid gap-4 py-4'>
//                 <Label htmlFor="name" className="text-right">Name</Label>
//                 <Input id="name"  name='name' className="col-span-3" />
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateProfileDialog;
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogOverlay, DialogPortal, DialogClose } from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_END_POINT_API } from "@/utils/constant";
// import { setUser } from "../redux/slices/authSlice"; // Adjust the path as needed

const UpdateProfileDialog = ({ open, setOpen }) => {

    const dispatch=useDispatch()
    const {user}=useSelector(store=>store.auth)

    const [input,setInput]=useState({
        fullname:user?.fullname,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skill:user?.profile?.skill?.map(skill=>skill),
        file:user?.profile?.resume
    })
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const fileEventHandler=(e)=>{
        const files= e.target.files?.[0];
        setInput({...input,file:files})

    }
    const submitHandler= async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("fullname",input.fullname)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("bio",input.bio)
        formData.append("skill",input.skill)
        if(input.file){
          formData.append("file",input.file)
        }

        try {
          dispatch(setLoading(true));
          const res=await axios.post(`${USER_END_POINT_API}/profile/update`,formData,{
              headers:{
                'Content-Type':'multipart/form-data'
              },
              withCredentials:true
          })
          if(res.data.success){
            dispatch(setUser(res.data.user));
            toast.success(res.data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.response?.data?.message || "Something went wrong")
        }
        finally{
          dispatch(setLoading(false));
        }
        setOpen(false)
         console.log(input)
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        {/* Overlay for dark background effect */}
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        
        {/* Modal Content */}
        <DialogContent 
          onInteractOutside={() => setOpen(false)} 
          className="fixed top-1/2 left-1/2 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Update Profile</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" type="text" onChange={changeEventHandler} name="fullname" value={input.fullname} className="col-span-3 border p-2 rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" onChange={changeEventHandler} name="email" value={input.email} className="col-span-3 border p-2 rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="number" className="text-right">Number</Label>
              <Input id="number"  onChange={changeEventHandler} name="phoneNumber" value={input.phoneNumber} className="col-span-3 border p-2 rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="bio" className="text-right">Bio</Label>
              <Input id="bio" onChange={changeEventHandler} name="bio" value={input.bio} className="col-span-3 border p-2 rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="skill" className="text-right">Skills</Label>
              <Input id="skill" onChange={changeEventHandler} name="skill" value={input.skill} className="col-span-3 border p-2 rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="file" className="text-right">Resume</Label>
              <Input id="file" onChange={fileEventHandler}  name="file" type="file" accept="application/pdf" className="col-span-3 border p-2 rounded-md" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <DialogClose asChild>
                <Button variant="outline" className="px-4 py-2">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default UpdateProfileDialog;
