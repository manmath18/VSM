import React from 'react'
import Card from './Card'
const AlumniSayArray = [
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
   
    
  ];
  
  const AlumniSay = () => {
    return (
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold text-center ">Our AlumniSay</h1>
        <div className="flex justify-between flex-wrap gap-4">
          {AlumniSayArray.map((feature, index) => (
            <Card
              key={index}
              profile={feature.logo}
              title={feature.title}
              description={feature.description}
              date={feature.date}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default AlumniSay;