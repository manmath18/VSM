import React from "react";
import ContactUs from "../ContactUs";
import { SocialIcon } from "react-social-icons";
import "react-social-icons/vimeo";
const Footer = () => {
  return (
    <div>
      <div class="  bg-indigo-600 text-white p-6 flex justify-between min-h-[50vh]  ">
        <div class=" ml-5 min-w-[50%] p-5">
          <div class="flex justify-around">
            <div class="flex flex-col items-start">
              <h1 class="cursor-pointer font-bold text-4xl">
                Alum<span className="text-[#F83002]">Nexus</span>
              </h1>

              <p class="pt-2">
                Connecting Graduates
                <br /> Worldwide
              </p>
            </div>
            <div class="flex flex-col items-start">
              <h3 class="cursor-pointer font-bold text-3xl">Quick Links</h3>

              <p class="pt-2">About Us</p>
              <p class="pt-2">Privacy Policy</p>
            </div>
          </div>
          <div class="flex justify-start">
            <div class="flex flex-col items-start ml-[6.8rem] pt-12">
              <div>
                <h3 class="cursor-pointer font-bold text-3xl text-left">
                  Follow Us
                </h3>
              </div>
              <div class="flex gap-2 pt-2 ">
                <SocialIcon
                  url="www.instagram.com"
                  style={{ height: "30px", width: "30px" }}
                />
                <SocialIcon
                  url="www.whatsapp.com"
                  style={{ height: "30px", width: "30px" }}
                />
                <SocialIcon
                  url="www.twitter.com"
                  style={{ height: "30px", width: "30px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="min-w-[50%]">
          <div class="flex flex-col items-center mt-4 ">
            {/* <h3 class="cursor-pointer font-bold text-xl">Contact Us</h3> */}
            <ContactUs />
          </div>
        </div>
      </div>
      <div class="bg-black text-white text-center p-4">
        <div class="flex justify-center items-center">
          <div class="w-full max-w-[80%] border-t-[1px] border-"></div>
        </div>
        <div> Copyright @2025 Team Vanadium All Rights Reserved!!</div>
      </div>
    </div>
  );
};

export default Footer;
