import React from "react";
import { IoClose } from "react-icons/io5";

const PopupPlayer = ({ isPlay, togglePlay }) => {
  if (!isPlay) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white dark:bg-dark p-5 rounded-lg shadow-lg w-full max-w-2xl m-4 relative">
        <button onClick={togglePlay} className="absolute top-2 right-2 text-3xl text-gray-700 hover:text-red-500">
          <IoClose />
        </button>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/skz6VDfm03I?si=ZE0mBi5atyVsp_0C"
          title="Demo Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default PopupPlayer;
