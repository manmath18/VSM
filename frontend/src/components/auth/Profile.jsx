import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../redux/profileactions";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import Navbar from "../shared/Navbar";
import { User, Users, Briefcase, GraduationCap, Link, Share2 } from "lucide-react";
import Update from "./Update";
import { setUser } from "../../redux/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  // Ensure default values to prevent crashes
  const { user, loading, error } = useSelector((store) => store.auth);

  const getData = async()=>{
      const userId = (JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)).user._id
      const data = await fetchUserProfile(userId)
      dispatch(setUser(data))
  }
  useEffect(()=>{
    getData()
  },[user])

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="w-full bg-blue-600 h-48" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-24">
            <div className="bg-white rounded-lg shadow-xl p-6">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <Avatar className="h-32 w-32 ring-4 ring-white">
                  <img
                    src={user?.profilePhoto || "/path/to/default/avatar.jpg"}
                    alt="Profile"
                    className="rounded-full"
                    onError={(e) => (e.target.src = "/path/to/default/avatar.jpg")}
                  />
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{user?.fullname || "John Doe"}</h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {user?.organisation?.currentJob?.designation || "Job Title"}
                  </p>
                  <div className="flex gap-3">
                    <Update />
                    <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                      <Link className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 mt-4">{user?.bio || "No bio available"}</p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Education */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-gray-600" />
                        Education
                      </h3>
                      <div className="space-y-4">
                        {user?.education &&
                          Object.entries(user.education).map(([key, edu]) => (
                            (edu.school || edu.university) && (
                              <div key={key}>
                                <h4 className="font-medium">{edu.school || edu.university || "Unknown Institution"}</h4>
                                <p className="text-sm text-gray-600">
                                  {edu.location || "Location not available"}
                                </p>
                              </div>
                            )
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Alumni Year */}
                  {user?.alumniYear && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-600" />
                          Alumni Year
                        </h3>
                        <p className="text-gray-600">{user.alumniYear}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Current Job */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-gray-600" />
                        Current Role
                      </h3>
                      <h4 className="font-medium">
                        {user?.organisation?.currentJob?.companyName || "Company Name"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {user?.organisation?.currentJob?.designation || "Designation"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user?.organisation?.currentJob?.jobDescription || "No job description provided"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Middle Column */}
                <div className="md:col-span-2 space-y-6">
                  {/* Past Experiences */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-gray-600" />
                        Past Experiences
                      </h3>
                      <div className="space-y-4">
                        {user?.organisation?.pastExperiences?.length ? (
                          user.organisation.pastExperiences.map((exp, index) => (
                            <div key={index}>
                              <h4 className="font-medium">{exp.companyName || "Company Name"}</h4>
                              <p className="text-sm text-gray-600">{exp.designation || "Designation"}</p>
                              <p className="text-sm text-gray-600">{exp.jobDescription || "No job description provided"}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600">No past experiences available</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-600" />
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user?.skills?.length ? (
                          user.skills.map((skill) => (
                            <Badge key={skill} className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-600">No skills listed</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
