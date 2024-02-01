import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Uploaded({ addAudio }) {
  const [uploadFile, setUploadFile] = useState(null);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);

  const handleUpload = async () => {
    try {
      if (!uploadFile) {
        errorMsg("Please! Uploaded Music");
        return;
      }

      setDisable(true);
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("upload_preset", "mymusic");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dbj3hfkzr/upload",
        formData
      );

      addAudio(uploadFile.name, data.secure_url);
      fileInputRef.current.value = "";
      setUploadFile(null);
      successMsg("success! Uploaded Music");
    } catch (error) {
      console.error("Upload failed", error);
      errorMsg("Upload failed. Please try again.");
      setError("Upload failed. Please try again.");
    } finally {
      setDisable(false);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* <div className="flex items-center mt-3 "> */}

      <div className="text-white text-start ms-1 flex flex-col justify-center mt-3">
        <input
          type="file"
          className="mb-3 ms-28 md:ms-20 sm:ms-40"
          ref={fileInputRef}
          onChange={(event) => setUploadFile(event.target.files[0])}
        />

        <button
          disabled={disable}
          onClick={handleUpload}
          className={`mt-2 mb-4 md:mt-0 ${
            disable ? "bg-red-500 cursor-not-allowed w-64" : "bg-violet-500"
          } text-white py-1 px-2 font-semibold rounded-xl shadow-md bg-violet-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75`}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {/* </div> */}
      </div>
    </>
  );
}

export default Uploaded;
