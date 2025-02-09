import React from 'react'
import Card from './Card'
const AlumniAchievementsArray = [
  {
    profile: "https://cdn-icons-png.flaticon.com/128/64/64572.png",
    title: "Prathamesh Bhaiya",
    description:
      "The connections I made at AlumniConnect and VSM opened doors for my career",
    learnMoreLink: "/learn-more-alumni",

    date: "12-10-2024",
  },
  {
    profile: "alumni.webp",
    title: "Snehal Didi",
    description:
      "VSM gave me the tools to succeed in my career and grow professionally",
    learnMoreLink: "/learn-more-career",
    date: "5-2-2023",
  },
  {
    profile: "alumni.webp",
    title: "Gauri Didi",
    description:
      "Expand your network with alumni events and global opportunities to meet professionals.",
    learnMoreLink: "/learn-more-network",
    date: "15-7-2021",
  },
]

const AlumniAchievements = () => {
  return (
    <div className="container mx-auto p-20 ">
      <h1 className="text-4xl font-bold text-center mb-5 text-[#7032db] ">
        Our Alumni Insights
      </h1>
      <div className="flex justify-between ">
        {AlumniAchievementsArray.map((feature, index) => (
          <Card
            key={index}
            profile={feature.profile}
            title={feature.title}
            date={feature.date}
            description={feature.description}
            learnMoreLink={feature.learnMoreLink}
          />
        ))}
      </div>
    </div>
  )
}
  
  export default AlumniAchievements;