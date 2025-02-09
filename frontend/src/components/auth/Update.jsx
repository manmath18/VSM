import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { DialogTrigger } from "@radix-ui/react-dialog";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

const Update = ({   user }) => {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    location: user?.location || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    education: {
      tenth: {
        school: user?.education?.tenth?.school || "",
        location: user?.education?.tenth?.location || "",
      },
      twelfth: {
        school: user?.education?.twelfth?.school || "",
        location: user?.education?.twelfth?.location || "",
      },
      diploma: {
        institution: user?.education?.diploma?.institution || "",
        location: user?.education?.diploma?.location || "",
      },
      degree: {
        university: user?.education?.degree?.university || "",
        location: user?.education?.degree?.location || "",
      },
    },
    alumniYear: user?.alumniYear || "",
    organisation: {
      currentJob: {
        companyName: user?.organisation?.currentJob?.companyName || "",
        designation: user?.organisation?.currentJob?.designation || "",
        jobDescription: user?.organisation?.currentJob?.jobDescription || "",
      },
      pastExperiences: user?.organisation?.pastExperiences || [],
    },
    profilePhoto: user?.profilePhoto || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child, subChild] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: subChild
            ? {
                ...prev[parent][child],
                [subChild]: value,
              }
            : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setFormData((prev) => ({ ...prev, skills }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
    }
  };

  const addPastExperience = () => {
    setFormData((prev) => ({
      ...prev,
      organisation: {
        ...prev.organisation,
        pastExperiences: [
          ...prev.organisation.pastExperiences,
          { companyName: "", designation: "", jobDescription: "" },
        ],
      },
    }));
  };

  const removePastExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      organisation: {
        ...prev.organisation,
        pastExperiences: prev.organisation.pastExperiences.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handlePastExperienceChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      organisation: {
        ...prev.organisation,
        pastExperiences: prev.organisation.pastExperiences.map((exp, i) =>
          i === index ? { ...exp, [field]: value } : exp
        ),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object from form state
      const payload = new FormData();

      // Loop through formData and append each entry to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "skills") {
          payload.append(key, JSON.stringify(value));
        } else if (key === "education" || key === "organisation") {
          payload.append(key, JSON.stringify(value));
        } else if (key === "profilePhoto" && value instanceof File) {
          payload.append("file", value);
        } else {
          payload.append(key, value);
        }
      });

      // POST request to backend
      const response = await fetch(`${BackendURL}/profile/update`, {
        method: "POST",
        body: payload,
        credentials: "include", // Important for session cookies (if any)
      });
      
      if (response.ok) {
        // Close the dialog if successful
        alert("Profile updated successfully!"); // Optional success alert
      } else {
        alert("Failed to update profile!"); // Optional error alert
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
        setOpen(false)
      setLoading(false); // Set loading state to false after the request
    }
  };

  return (
    <Dialog open={open}>
      {/* <DialogTrigger asChild> */}
        <button onClick={()=>{
            setOpen(true)
        }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Pencil className="h-4 w-4" />
          Update
        </button>
      {/* </DialogTrigger> */}
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        aria-labelledby="update-profile-dialog-title"
      >
        <DialogHeader>
          <DialogTitle id="update-profile-dialog-title" className="text-indigo-800">Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-indigo-800">
                Basic Information
              </h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="fullname"
                    className="text-right text-indigo-700"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right text-indigo-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-right text-indigo-700"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="location"
                    className="text-right text-indigo-700"
                  >
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right text-indigo-700">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="skills"
                    className="text-right text-indigo-700"
                  >
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills.join(", ")}
                    onChange={handleSkillsChange}
                    placeholder="Separate skills with commas"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="profilePhoto"
                    className="text-right text-indigo-700"
                  >
                    Profile Photo
                  </Label>
                  <Input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="col-span-3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-indigo-800">Education</h3>
              <div className="space-y-4">
                {/* 10th */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-indigo-800">
                    10th Standard
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="education.tenth.school"
                      value={formData.education.tenth.school}
                      onChange={handleChange}
                      placeholder="School Name"
                    />
                    <Input
                      name="education.tenth.location"
                      value={formData.education.tenth.location}
                      onChange={handleChange}
                      placeholder="Location"
                    />
                  </div>
                </div>

                {/* 12th */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-indigo-800">
                    12th Standard
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="education.twelfth.school"
                      value={formData.education.twelfth.school}
                      onChange={handleChange}
                      placeholder="School Name"
                    />
                    <Input
                      name="education.twelfth.location"
                      value={formData.education.twelfth.location}
                      onChange={handleChange}
                      placeholder="Location"
                    />
                  </div>
                </div>

                {/* Diploma */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-indigo-800">
                    Diploma
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="education.diploma.institution"
                      value={formData.education.diploma.institution}
                      onChange={handleChange}
                      placeholder="Institution Name"
                    />
                    <Input
                      name="education.diploma.location"
                      value={formData.education.diploma.location}
                      onChange={handleChange}
                      placeholder="Location"
                    />
                  </div>
                </div>

                {/* Degree */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-indigo-800">
                    Degree
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="education.degree.university"
                      value={formData.education.degree.university}
                      onChange={handleChange}
                      placeholder="University Name"
                    />
                    <Input
                      name="education.degree.location"
                      value={formData.education.degree.location}
                      onChange={handleChange}
                      placeholder="Location"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organisation */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-indigo-800">
                Organisation
              </h3>
              <div className="space-y-4">
                {/* Current Job */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-indigo-800">
                    Current Job
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="organisation.currentJob.companyName"
                      value={formData.organisation.currentJob.companyName}
                      onChange={handleChange}
                      placeholder="Company Name"
                    />
                    <Input
                      name="organisation.currentJob.designation"
                      value={formData.organisation.currentJob.designation}
                      onChange={handleChange}
                      placeholder="Designation"
                    />
                  </div>
                  <Textarea
                    name="organisation.currentJob.jobDescription"
                    value={formData.organisation.currentJob.jobDescription}
                    onChange={handleChange}
                    placeholder="Job Description"
                  />
                </div>

                {/* Past Experience */}
                <div>
                  <h4 className="text-sm font-medium text-indigo-800">
                    Past Experiences
                  </h4>
                  {formData.organisation.pastExperiences.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          name={`organisation.pastExperiences[${index}].companyName`} 
                          value={exp.companyName}
                          onChange={(e) =>
                            handlePastExperienceChange(
                              index,
                              "companyName",
                              e.target.value
                            )
                          }
                          placeholder="Company Name"
                        />
                        <Input
                          name={`organisation.pastExperiences[${index}].designation`} 
                          value={exp.designation}
                          onChange={(e) =>
                            handlePastExperienceChange(
                              index,
                              "designation",
                              e.target.value
                            )
                          }
                          placeholder="Designation"
                        />
                      </div>
                      <Textarea
                       name={`organisation.pastExperiences[${index}].jobDescription`} 
                        value={exp.jobDescription}
                        onChange={(e) =>
                          handlePastExperienceChange(
                            index,
                            "jobDescription",
                            e.target.value
                          )
                        }
                        placeholder="Job Description"
                      />
                      <Button
                        type="button"
                        onClick={() => removePastExperience(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addPastExperience}
                    className="text-indigo-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="text-indigo-800"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Update;