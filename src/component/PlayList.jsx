import musicImg from "../assets/music.jpg";
function PlayList({ data, setTrack }) {
  return (
    <>
      <div className="mt-3 ms-3">
        {data.map((i, index) => (
          <div
            className="flex items-center mt-3 "
            onClick={() => setTrack(index)}
            key={index}
          >
            <div className="shrink-0 border-red-300">
              <img
                className="h-16 w-16 object-cover rounded-full"
                src={musicImg}
                alt="Current music photo"
              />
            </div>
            <div className="text-white text-start ms-3">{i.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PlayList;
