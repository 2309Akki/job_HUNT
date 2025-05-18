import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT_API } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
const Login = () => {
  const { loading ,user} = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input)
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_END_POINT_API}/login`, input, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true, // Ensure backend supports credentials
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="border-gray-200 w-1/2 border p-4 my-10 rounded-md"
        >
          <h1 className="mb-5 font-bold text-xl">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your name"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your name"
              onChange={changeEventHandler}
              name="password"
              value={input.password}
            />
          </div>
          <div>
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center flex-row gap-10 my-5"
            >
              <div className="flex  items-center space-x-2">
                {/* <RadioGroupItem value="default" id="r1" /> */}
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">student</Label>
              </div>
            </RadioGroup>
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
              Login
            </Button>
          )}
          <span className="text-sm">
            Don't have an accout?
            <Link to="/signup" className="text-blue-500 hover:underline ">
             
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
