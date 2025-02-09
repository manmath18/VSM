import React from 'react';
import { Button } from './ui/button';
import { ButtonGroup } from "@material-tailwind/react"

const Card = ({
  logo,
  title,
  description,
  learnMoreLink,
  image,
  profile,
  date,
}) => {
  // console.log("LOGO:", logo)
  // console.log("PROFILE :", profile)
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm flex flex-wrap ">
      {image ? (
        <div class="flex flex-col gap-2 ">
          <div>
            <img src={image} alt="Card Image" className="w-30 h-30 mr-4" />
          </div>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            nostrum accusamus, quibusdam reprehenderit, est rem sunt impedit
            rerum unde eum eveniet perferendis adipisci temporibus, libero
            repellendus aut quaerat sed sint?
          </div>
          <button class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full ">
            Register Now
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {logo ? (
            <img src={logo} alt={`${title} logo`} className="w-8 h-8 mr-4" />
          ) : (
            <div>
              <img
                src={profile}
                alt="Profile Image"
                className="rounded-full w-8 h-8 border-red-400"
              />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-[#0e0e0e]">{title} </h2>
            {date && <div>{date}</div>}
          </div>
        </div>
      )}

      {!image && (
        <>
          <p className="text-gray-700 mt-4 mb-6">{description}</p>
          {logo && learnMoreLink && (
            <Button
              as="a"
              href={learnMoreLink}
              className="bg-[#3B71CA] text-white py-2 px-4 rounded hover:bg-cyan-600"
            >
              Learn More →
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default Card;