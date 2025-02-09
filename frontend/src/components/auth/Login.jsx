import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../../redux/authSlice.js";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Input values:", input);

    if (!input.email || !input.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${backendUrl}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred during login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="bg-gradient-to-r from-purple-300 to-indigo-400 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 md:p-8"
        >
          <h1 className="text-2xl font-bold text-indigo-700 text-center mb-6">
            Welcome Back!
          </h1>
  
          <div className="space-y-4">
            <div>
              <Label className="text-gray-600">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                autoComplete="current-email"
                onChange={changeEventHandler}
                placeholder="Enter your email..."
                required
                className="focus:ring-2 focus:ring-indigo-400 transition duration-200"
              />
            </div>
            <div>
              <Label className="text-gray-600">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                autoComplete="current-password"
                onChange={changeEventHandler}
                placeholder="Enter your password..."
                required
                className="focus:ring-2 focus:ring-indigo-400 transition duration-200"
              />
            </div>
          </div>
  
          <div className="flex items-center justify-between mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
  
          {loading ? (
            <Button className="w-full my-4 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Logging in...
            </Button>
          ) : (
             <Button
              type="submit"
              className="w-full my-4 bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300"
            >
              Login
            </Button>
          )}
  
          <p className="text-sm text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
  
export default Login;
