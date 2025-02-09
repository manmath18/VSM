import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";

// Define your posted jobs array
const postedJobs = [
  {
    title: "Frontend Developer",
    desc: "Work on cutting-edge frontend technologies.",
    img: "imgLink",
  },
  {
    title: "Backend Developer",
    desc: "Develop high-performance backend services.",
    img: "imgLink",
  },
  {
    title: "Full Stack Developer",
    desc: "Handle both frontend and backend development.",
    img: "imgLink",
  },
  {
    title: "Mobile Developer",
    desc: "Develop mobile applications for iOS and Android.",
    img: "imgLink",
  },
];

function JobPortalHero() {
  const searchJobHandler = () => {
    console.log("Search Jobs Clicked!");
  };

  return (
    <div>
      <Link to="/jobPost">
        <div className="flex justify-end cursor-pointer p-10">
          <div className="rounded-full h-[3rem] w-36 font-bold bg-blue-400 pt-2.5 text-center">
            <span>Post a Job</span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center pt-10 gap-5">
        <h1 className="text-4xl font-bold">
          <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aspernatur temporibus nihil tempora dolor!
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Render Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {postedJobs.map((job, index) => (
            <JobCard
              key={index} // Ensure unique keys for each item
              title={job.title}
              desc={job.desc}
              img={job.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobPortalHero;