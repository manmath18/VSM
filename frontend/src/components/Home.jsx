import React from "react";
import Navbar from "./shared/Navbar";
import Hero from "./shared/Hero";

import Footer from "./shared/Footer";
import Counter from "./Counter"
import Features from "./Features"
import UpcomingEvents from "./UpcomingEvents"
import AlumniAchievements from "./AlumniAchievements"
import AlumniSay from "./AlumniSay"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Counter />
      <Features />
      <UpcomingEvents />
      <AlumniAchievements />
      {/* <AlumniSay /> */}
      {/* <Cards /> */}
      <Footer />
    </div>
  )
}
export default Home;
