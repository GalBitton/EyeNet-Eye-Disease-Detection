import React from "react";
import Hero from "../components/home/Hero.jsx";
import Quotes from "../components/home/Quotes.jsx";
import Banner from "../components/home/Banner.jsx";
import Features from "../components/home/Features.jsx";
import AppStore from "../components/home/AppStore.jsx";

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
