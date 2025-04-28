import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
