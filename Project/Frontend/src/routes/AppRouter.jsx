import React from "react";
import { Routes, Route } from "react-router-dom";
import EyeScan from "../pages/EyeScan.jsx";
import Results from "../pages/results/Results.jsx";
import About from "../pages/About.jsx";
import Technology from "../pages/Technology.jsx";
import Team from "../pages/Team.jsx";
import HomePage from "../pages/home/HomePage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import {ROUTES} from "../constants/routes.jsx";


const AppRouter = () => {
  return (
    <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.EYESCAN} element={<EyeScan />} />
        <Route path={ROUTES.RESULTS} element={<Results />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.TECHNOLOGY} element={<Technology />} />
        <Route path={ROUTES.TEAM} element={<Team />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
