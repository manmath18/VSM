import React from 'react'
import Card from './Card'
const featuresArray = [
  {
    logo: "https://i.ibb.co/RppZtf7t/alumni.png",
    title: "Alumni Connect",
    description:
      "Join thousands of alumni making meaningful connections and advancing their careers.",
    learnMoreLink: "/learn-more-alumni",
    image: "https://via.placeholder.com/50",
  },
  {
    logo: "https://i.ibb.co/0pXSbkRR/growth.png",
    title: "Career Growth",
    description:
      "Take charge of your career with professional resources and mentoring from industry experts.",
    learnMoreLink: "/learn-more-career",
    image: "https://via.placeholder.com/50",
  },
  {
    logo: "https://i.ibb.co/jk5rRQCn/networking.png",
    title: "Networking Opportunities",
    description:
      "Expand your network with alumni events and global opportunities to meet professionals.",
    learnMoreLink: "/learn-more-network",
    image: "https://via.placeholder.com/50",
  },
]

const Features = () => {
  return (
    <div className="container mx-auto p-20 ">
      <h1 className="text-4xl font-bold text-center mb-5 text-[#7032db] ">Our Features</h1>
      <div className="flex justify-around ">
        {featuresArray.map((feature, index) => (
          <Card
            key={index}
            logo={feature.logo}
            title={feature.title}
            description={feature.description}
            learnMoreLink={feature.learnMoreLink}
          />
        ))}
      </div>
    </div>
  )
}
  
  export default Features;