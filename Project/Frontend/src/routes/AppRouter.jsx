import React from "react";
import { Routes, Route } from "react-router-dom";
import EyeScan from "../pages/EyeScan.jsx";
import Results from "../pages/Results.jsx";
import About from "../pages/About.jsx";
import Technology from "../pages/Technology.jsx";
import Team from "../pages/Team.jsx";
import HomePage from "../pages/HomePage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import NotFound from "../pages/NotFound.jsx";


const AppRouter = ({ togglePlay, results, setResults }) => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<EyeScan />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      {/* אפשר להוסיף בעתיד גם דף 404 */}
    </Routes>
  );
};

export default AppRouter;
