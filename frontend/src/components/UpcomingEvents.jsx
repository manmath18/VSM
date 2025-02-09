import React from 'react'
import Card from './Card'
const featuresArray = [
  {
    title: "Alumni Connect",
    description:
      "Join thousands of alumni making meaningful connections and advancing their careers.",
    learnMoreLink: "/learn-more-alumni",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZNT6sM5BYaK8hz2rDLtbknfhtQaJtZ8vtA&s",
  },
  {
    title: "Career Growth",
    description:
      "Take charge of your career with professional resources and mentoring from industry experts.",
    learnMoreLink: "/learn-more-career",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZNT6sM5BYaK8hz2rDLtbknfhtQaJtZ8vtA&s",
  },
  {
    title: "Networking Opportunities",
    description:
      "Expand your network with alumni events and global opportunities to meet professionals.",
    learnMoreLink: "/learn-more-network",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZNT6sM5BYaK8hz2rDLtbknfhtQaJtZ8vtA&s",
  },
]

const UpcomingEvents = () => {
  return (
    <div className="container mx-auto p-20 ">
      <h1 className="text-4xl font-bold text-center mb-5 text-[#7032db] ">Upcoming Events</h1>
      <div className="flex justify-around ">
        {featuresArray.map((feature, index) => (
          <Card
            key={index}
            image={feature.image}
            title={feature.title}
            description={feature.description}
            learnMoreLink={feature.learnMoreLink}
          />
        ))}
      </div>
    </div>
  )
}
  
  export default UpcomingEvents;