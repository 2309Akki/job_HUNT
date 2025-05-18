import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skill=[]
const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const isResume = !!user?.profile?.resume;
  useGetAppliedJobs()
  
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={user.profile.profilePhoto}
                alt="@shadcn"
                className="rounded-full w-20 h-20"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-right "
          >
            <Pen />
          </Button>
        </div>
        <div className="flex flex-col mt-3  ">
          <div className="flex flex-row gap-2  my-3">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex flex-row gap-2  my-3">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          {user.profile.skill.length != 0 ? (
            user.profile.skill.map((item, index) => (
              <Badge
                key={index}
                variant="outline"
                className={"mr-2 mb-2 text-white bg-black"}
              >
            
                {item}
              </Badge>
            ))
          ) : (
            <Badge
              variant="outline"
              className={"mr-2 mb-2 text-white bg-black"}
            >
              
              NA
            </Badge>
          )}
        </div>
        <div className="grid w-full max-w-sm gap-1.5 items-center">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user.profile.resume}
              className="w-full cursor-pointer text-blue-400 hover:underline"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl bg-white">
        <h1 className="text-lg font-bold my-3">Applied Jobs</h1>
        {/* application Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
