import React from "react"

export default function ContactUs() {
  return (
    <div className=" flex items-center justify-center min-w-[100%] ">
      <div className="w-[50%] max-w-md  space-y-6  rounded-lg shadow-md">
        <div class=" font-bold text-3xl"> Contact Us</div>
        <form className="space-y-2">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              className="w-full p-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-32"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-white text-black rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}