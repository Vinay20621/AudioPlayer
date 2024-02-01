import React, { useEffect, useRef, useState } from "react";
import PlayList from "./PlayList";
import musicImg from "../assets/music.jpg";
import Uploaded from "./Uploaded";
function MusicPlayer({ currentTrack, setTime, setTrack, data, addAudio }) {
  const audioRef = useRef(null);

  // not play automatic on first time
  const [autoPlay, setAutoPlay] = useState(false);
  useEffect(() => {
    // Retrieve the currentTime from localStorage
    const savedTime = localStorage.getItem("currentTime");
    if (savedTime) {
      setTime(parseFloat(savedTime));
      if (audioRef.current) {
        audioRef.current.currentTime = parseFloat(savedTime);
      }
    }
  }, []);

  const handleTimeUpdate = (e) => {
    // Update the currentTime state and save it to localStorage
    setTime(e.target.currentTime);
    localStorage.setItem("currentTime", e.target.currentTime.toString());
    // play automatic next song
    setAutoPlay(true);
  };

  const handleTrackEnded = () => {
    // Play the next track
    setTrack((prevTrack) => (prevTrack + 1) % data.length);
    // Reset currentTime
    setTime(0);
    localStorage.setItem("currentTime", "0");
  };

  return (
    <div className="container flex flex-col md:flex-row md:justify-between justify-center ">
      <div className="order-last md:order-first">
        <Uploaded addAudio={addAudio}></Uploaded>
        <PlayList data={data} setTrack={setTrack}></PlayList>
      </div>

      <div className="mt-3 ">
        <div
          className="shrink-0 border-red-300  flex justify-center me-14 w-full"
          onClick={() => setTrack(index)}
        >
          <img
            className="xl:h-80 xl:w-80  md:h-64 md:w-64 object-cover rounded-full mx-auto"
            src={musicImg}
            alt="Current music photo"
          />
        </div>

        <div className="flex  mt-3 mb-3 me-4 justify-center">
          <audio
            ref={audioRef}
            controls
            autoPlay={autoPlay}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleTrackEnded}
            src={data[currentTrack].url}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
