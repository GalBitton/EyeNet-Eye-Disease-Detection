import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRouter from "./routes/AppRouter.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  return (
    <Router>
      <main className="overflow-x-hidden bg-white dark:bg-black text-black dark:text-white duration-300 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <AppRouter />
        </div>
        <Footer />
      </main>
    </Router>
  );
};

export default App;




