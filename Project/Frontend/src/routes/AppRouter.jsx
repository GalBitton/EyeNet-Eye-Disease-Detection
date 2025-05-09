import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/homepage.jsx";
import HelperPage from "../pages/HelperPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import UploadPage from "../pages/UploadPage.jsx";
import RecordPage from "../pages/RecordPage.jsx";
import ResultPage from "../pages/ResultPage.jsx";

const AppRouter = ({ togglePlay, results, setResults }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage togglePlay={togglePlay} />} />
      <Route path="/helper" element={<HelperPage />} />
      <Route path="/video-upload" element={<UploadPage setResults={setResults} />} />
      <Route path="/record-video" element={<RecordPage setResults={setResults} />} />
      <Route path="/result" element={<ResultPage results={results} setResults={setResults} />} />
      <Route path="/contact" element={<ContactPage />} />
      {/* אפשר להוסיף בעתיד גם דף 404 */}
    </Routes>
  );
};

export default AppRouter;
