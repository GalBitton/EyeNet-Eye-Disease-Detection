import React from "react";
import Hero from "../components/home/Hero";
import Quotes from "../components/home/Quotes";
import Banner from "../components/home/Banner";
import Features from "../components/home/Features";
import AppStore from "../components/home/AppStore";

const HomePage = ({ togglePlay }) => {
  return (
    <>
      <Hero togglePlay={togglePlay} />
      <Quotes />
      <Banner togglePlay={togglePlay} />
      <Features />
      <AppStore />
    </>
  );
};

export default HomePage;
