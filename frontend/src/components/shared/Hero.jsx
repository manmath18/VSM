import React from 'react'
import { ReactTyped } from 'react-typed'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div>
      <div className="bg-white flex items-center mx-auto max-w-8xl my-12 gap-4">
        <div className="w-1/2 mx-28">
          <div className="text-5xl font-bold mb-4 text-[#7032db]">
            Welcome to
            <br />
            <span className="text-[#7032db] text-6xl">
              <ReactTyped
                strings={["Alumni Connect"]}
                typeSpeed={100}
                backSpeed={40}
                loop
                cursorChar="|"
                showCursor={true}
              />
            </span>
          </div>
          <p className="text-lg mb-6">
            Join thousands of alumni making meaningful
            <br />
            connections and advancing their careers.
          </p>
          <Button className="bg-[#3B71CA] text-white py-2 px-4 rounded hover:bg-cyan-600">
            Explore More...
          </Button>
        </div>
        <div className="w-2xl mt-6 mr-32 mb-10">
          <img
            src="./alumni.webp"
            alt="illustration"
            className="w-[500px] h-[500px] rounded-full border-4  border-gray-300"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
