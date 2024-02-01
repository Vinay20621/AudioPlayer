import { useState } from "react";
import { audioData } from "./audioData";
import MusicPlayer from "./component/MusicPlayer";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useState(() => {
    // check if not first time then store the music data from the local storage
    const local = localStorage.getItem("audioData");
    if (local) {
      setData(JSON.parse(local));
    } else {
      // if first time then set default data into the localStorage
      setData(audioData);
    }
  }, []);

  // add new music into the playlist and also modify into the localStorage
  const addAudio = (audioName, newAudio) => {
    setData([...data, { name: audioName, url: newAudio }]);
    localStorage.setItem(
      "audioData",
      JSON.stringify([...data, { name: audioName, url: newAudio }])
    );
  };
  const setTime = (time) => {
    setCurrentTime(time);
  };
  const setTrack = (track) => {
    setCurrentTrack(track);
  };
  return (
    <>
      <span className="mx-auto text-4xl font-bold text-white ">
        * Music App *
      </span>
      <div className="bg-gray-700 main  mx-auto pb-3 pt-12 mt-4">
        <MusicPlayer
          currentTrack={currentTrack}
          currentTime={currentTime}
          setTime={setTime}
          setTrack={setTrack}
          data={data}
          addAudio={addAudio}
        ></MusicPlayer>
      </div>
    </>
  );
}

export default App;

// import React, { useState } from 'react';
// import { useRef } from 'react';

// const App = () => {
//   const [selectedFile, setSelectedFile] = useState("okkkk");
//   const fileInputRef = useRef(null);
//   const handle=()=>
//   {

//   }
//   const on=()=>
//   {
//     fileInputRef.current.value = '';
//   }

//   return (
//     <div>
//       <input type="file"  ref={fileInputRef} onChange={handle}/>
//       <button onClick={on} >Upload</button>
//     </div>
//   );
// };

// export default App;
