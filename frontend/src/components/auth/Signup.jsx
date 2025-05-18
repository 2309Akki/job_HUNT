import React, { useState ,useEffect} from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_END_POINT_API } from "@/utils/constant.js";
import { toast } from "sonner";
import axios from "axios";
import { setLoading } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
// import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    // console.log("Form Data:", Object.fromEntries(formData));
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_END_POINT_API}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // console.log("API Response:", res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      // console.error("Axios Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

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
          <h1 className="mb-5 font-bold text-xl">SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your name"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="number"
              placeholder="Enter your name"
              onChange={changeEventHandler}
              name="phoneNumber"
              value={input.phoneNumber}
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
              className="flex items-center flex-row gap-4 my-5"
            >
              <div className="flex items-center space-x-2">
                {/* <RadioGroupItem value="default" id="r1" /> */}
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">recruiter</Label>
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
                <Label htmlFor="student">student</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full mt-5 bg-green-1000 text-white cursor-pointer flex justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin bg-green" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-5 bg-green-400 text-white cursor-pointer flex justify-center"
            >
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an accout?{" "}
            <Link to="/login" className="text-blue-500 hover:underline ">
              {" "}
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
// const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//         const formData = new FormData();
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("password", input.password);
//         formData.append("role", input.role);

//         if (input.file) {
//             formData.append("file", input.file);
//         }

//         const res = await axios.post(`${USER_END_POINT_API}/register`, formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//             withCredentials: true,
//         });

//         if (res.data.success) {
//             toast.success(res.data.message);
//             navigate("/login");
//         }
//     } catch (error) {
//         console.error(error);
//         toast.error(error.response?.data?.message || "Something went wrong!");
//     }
// };
