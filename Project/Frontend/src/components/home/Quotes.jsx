import React from "react";
import { STRINGS } from "../../constants/strings.jsx";

const Quotes = () => {
  return (
    <section className="container py-14 px-4">
      <h1 className="text-2xl sm:text-4xl font-bold max-w-[650px] mx-auto text-center font-parisienne">
        {STRINGS.QUOTE}
      </h1>
    </section>
  );
};

export default Quotes;
