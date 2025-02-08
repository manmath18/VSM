import React from 'react'
import Card from './Card'
const AlumniAchievementsArray = [
    {
     
        profile: 'alumni.webp',
      title: 'Alumni Connect',
      description: 'Join thousands of alumni making meaningful connections and advancing their careers.',
    learnMoreLink: '/learn-more-alumni',
     
      date:"12-12-2024"
     
    },
    {
        profile: 'alumni.webp',
      title: 'Career Growth',
      description: 'Take charge of your career with professional resources and mentoring from industry experts.',
      learnMoreLink: '/learn-more-career',
      date:"12-12-2024"
     
    },
    {
      profile: 'alumni.webp',
      title: 'Networking Opportunities',
      description: 'Expand your network with alumni events and global opportunities to meet professionals.',
      learnMoreLink: '/learn-more-network',
      date:"12-12-2024"
     
    },
  ];
  
  const AlumniAchievements = () => {
    return (
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold text-center ">Our AlumniAchievements</h1>
        <div className="flex justify-between ">
          {AlumniAchievementsArray.map((feature, index) => (
            <Card
              key={index}
              profile={feature.logo}
              title={feature.title}
              date={feature.date}
              description={feature.description}
              learnMoreLink={feature.learnMoreLink}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default AlumniAchievements;