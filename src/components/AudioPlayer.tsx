import React, { useState, useRef, useEffect } from "react";

const AudioPlayerButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const STREAM_REFRESH_INTERVAL: number = 60000;

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const refreshRef = () => {
      audioRef.current?.load();

      isPlaying && audioRef.current?.play();
    };

    const clearMe = setInterval(refreshRef, STREAM_REFRESH_INTERVAL);

    return () => clearInterval(clearMe);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <video autoPlay muted loop className="background-video">
        <source
          src={`${process.env.PUBLIC_URL}/background.webm`}
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>
      <p className="player-title my-5 bg-black px-7 py-3">C.R.E.A.M. FM</p>
      <button
        onClick={togglePlayPause}
        className="bg-blue-500 text-white font-bold py-2 px-10 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio
        ref={audioRef}
        src={`${process.env.REACT_APP_HOMEPAGE_STREAM_URL}`}
        preload="none"
      />
    </div>
  );
};

export default AudioPlayerButton;
