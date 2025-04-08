import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Quotes from "./components/Quotes"
import Banner from "./components/Banner"
import Features from "./components/Features"
import Footer from "./components/Footer"
import PopupPlayer from "./components/PopupPlayer"
import AOS from "aos";
import "aos/dist/aos.css";
import VideoRecorder from "./components/VideoRecorder";
import ContactUs from "./components/ContactUs";
import Upload from "./components/Upload";
import HelperPage from "./components/HelperPage";
import ResultPage from "./components/ResultPage";

const App = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [results, setResults] = useState(null); // Added state for results
  
  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <main className="overflow-x-hidden bg-white dark:bg-black text-black dark:text-white duration-300">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero togglePlay={togglePlay} />
                <Quotes />
                <Banner togglePlay={togglePlay} />
                <Features />
                <Footer />
                <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
              </>
            }
          />

          {/* Helper Page */}
          <Route path="/helper" element={<HelperPage />} />

          {/* Video Recorder */}
          <Route
            path="/record-video"
            element={<VideoRecorder setResults={setResults} />}
          />

          {/* Contact Us Page */}
          <Route path="/contact" element={<ContactUs />} />

          {/* Upload Page */}
          <Route
            path="/video-upload"
            element={<Upload setResults={setResults} />}
          />

          {/* Result Page */}
          <Route
            path="/result"
            element={<ResultPage results={results} setResults={setResults} />}
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App
