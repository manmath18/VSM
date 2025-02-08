import React from 'react';
import { Button } from './ui/button';

const Card = ({ logo, title, description, learnMoreLink, image, profile, date }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md flex flex-wrap">
      <div className="flex items-center">
        {logo ? (
          <img src={logo} alt={`${title} logo`} className="w-12 h-12 mr-4" />
        ) : image ? (
          <div>
            <img src={image} alt="Card Image" className="w-12 h-12 mr-4" />
          </div>
        ) : (
          <div>
            <img
              src={profile}
              alt="Profile Image"
              className="rounded-full w-12 h-12 border-red-400"
            />
          </div>
        )}
       <div>
       <h2 className="text-2xl font-bold text-[#7032db]">{title} </h2>
       {date && (<div>{date}</div>)}
       </div>
      </div>
      <p className="text-gray-700 mt-4 mb-6">{description}</p>
     { learnMoreLink && <Button
        as="a"
        href={learnMoreLink}
        className="bg-[#3B71CA] text-white py-2 px-4 rounded hover:bg-cyan-600"
      >
        Learn More →
      </Button>}
    </div>
  );
};

export default Card;
