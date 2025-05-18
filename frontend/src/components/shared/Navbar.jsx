import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_END_POINT_API } from "@/utils/constant.js";
import { setUser } from "@/redux/authSlice.js";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  // const user = false;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`${USER_END_POINT_API}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };
  return (
    <div className="bg-white shadow py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12 mr-14">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role == "recruiter" ? (
              <>
                <li className="cursor-pointer hover:text-blue-600">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  <Link to="/admin/job">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="cursor-pointer hover:text-blue-600">
                  <Link to="/">Home</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div flex items-center gap-2>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5B30a6] ml-3 ">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profile.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <Avatar className="cursor-pointer w-10 h-10">
                    <AvatarImage
                      src={user.profile.profilePhoto}
                      alt="@shadcn"
                      className="rounded-full"
                    />
                  </Avatar>

                  {/* User Info */}
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-1 flex flex-col justify-center items-center">
                  {user && user.role == "recruiter" ? (
                    <></>
                  ) : (
                    <>
                      <Button
                        variant="link"
                        className="flex items-center gap-2 text-blue-600 cursor-pointer w-27"
                      >
                        <User2 className="w-5 h-5" />
                        <Link to="/profile"> View Profile</Link>
                      </Button>
                    </>
                  )}

                  <Button
                    variant="link"
                    className="flex items-center gap-2 text-red-600 cursor-pointer w-20"
                    onClick={logoutHandler}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
