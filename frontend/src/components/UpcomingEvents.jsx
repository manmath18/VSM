import React from 'react'
import Card from './Card'
const featuresArray = [
    {
     
      title: 'Alumni Connect',
      description: 'Join thousands of alumni making meaningful connections and advancing their careers.',
      learnMoreLink: '/learn-more-alumni',
      image:'https://via.placeholder.com/50'
    },
    {
  
      title: 'Career Growth',
      description: 'Take charge of your career with professional resources and mentoring from industry experts.',
      learnMoreLink: '/learn-more-career',
       image:'https://via.placeholder.com/50'
    },
    {
     
      title: 'Networking Opportunities',
      description: 'Expand your network with alumni events and global opportunities to meet professionals.',
      learnMoreLink: '/learn-more-network',
       image:'https://via.placeholder.com/50'
    },
  ];
  
  const UpcomingEvents = () => {
    return (
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
        <div className="flex justify-between ">
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
    );
  };
  
  export default UpcomingEvents;