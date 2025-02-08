import React from "react"
import ContactUs from "../ContactUs"

const Footer = () => {
  return (
    <div class=" bg-black text-white p-6 flex justify-around ">
      <div class="flex flex-col items-center">
        <h3 class="cursor-pointer font-bold">AlumnuiConnect</h3>
        <p>Connecting gradtuates worldwide</p>
      </div>
      <div class="flex flex-col items-center">
        <h3 class="cursor-pointer font-bold">Quick Links</h3>
        <p>About Us</p>
        <p>Privacy Policy</p>
      </div>
      <div class="flex flex-col items-center">
        <h3 class="cursor-pointer font-bold">Follow Us</h3>
        <p>Insta</p>
        <p>Insta</p>
        <p>Insta</p>
      </div>
      <div class="flex flex-col items-center">
        <h3 class="cursor-pointer font-bold">Contact Us</h3>
        <ContactUs />
      </div>
    </div>
  )
}

export default Footer
