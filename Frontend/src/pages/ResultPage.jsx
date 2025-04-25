import React from "react";
import Result from "../components/features/ResultPage";

const ResultPage = ({ results, setResults }) => {
  return <Result results={results} setResults={setResults} />;
};

export default ResultPage;
