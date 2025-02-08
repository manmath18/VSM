import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../redux/authSlice.js"
import { toast } from "sonner"
import axios from "axios"

const BackendURL = import.meta.env.VITE_BACKEND_URL

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${BackendURL}/logout`,
        {},
        { withCredentials: true }
      ) // Ensure it's the correct method
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      } else {
        toast.error("Logout failed, please try again.")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      )
    }
  }
  return (
    <div className="bg-slate-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="flex">
          <div className="my-1">
            <Link to="/">
              <h1 className="text-2xl font-bold">
                <span className="text-[#F83002]">Alumni Connect</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-12 ">
          <ul className="flex font-medium items-center gap-5">
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <li>Directory</li>
              <Link to="/">
                <li>Jobs</li>
              </Link>
              <li>Events</li>
              <Link to="/">
                <li>Donate</li>
              </Link>
            </>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-black text-white hover:bg-[#747373] "
                  variant="secondary"
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger as>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    alt=""
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        alt=""
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
