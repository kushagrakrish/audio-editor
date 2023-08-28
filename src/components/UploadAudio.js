import React, { useState, useEffect, useRef, useContext } from "react";
import {
  addAudioFile,
  initializeIndexedDB,
  getAllAudioFiles,
  DB_NAME,
} from "../IndexedDB";
import { FileContext } from "../contexts/fileContext";

const UploadAudio = ({ history }) => {
  const inputFile = useRef(null);
  const { setFileURL } = useContext(FileContext);
  const [file, setFile] = useState(null);
  const [uploadedAudioFiles, setUploadedAudioFiles] = useState([]);

  useEffect(() => {
    if (file) {
      setFileURL(file);
      history.push("/edit");
    }
  }, [file, setFileURL, history]);

  const handleButtonClick = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    initializeIndexedDB()
      .then((db) => getAllAudioFiles(db))
      .then((audioFiles) => {
        setUploadedAudioFiles(audioFiles); // Store the list of audio files
      })
      .catch((error) => {
        console.error("Failed to initialize IndexedDB:", error);
      });
  }, []);

  // const handleFileUpload = (e) => {
  //   // console.log(file);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // };

  const handleResetIndexedDB = async () => {
    try {
      // Close any open connections to the IndexedDB
      await indexedDB.databases();
      indexedDB.deleteDatabase(DB_NAME);

      // Reset the uploaded audio files state
      setUploadedAudioFiles([]);
    } catch (error) {
      console.error("Failed to reset IndexedDB:", error);
    }
  };
  const handleFileUpload = async (e) => {
    try {
      const audioBlob = await e.target.files[0].arrayBuffer();
      const audioName = e.target.files[0].name; // Get the name of the uploaded file
      initializeIndexedDB()
        .then((db) => addAudioFile(db, audioBlob, audioName)) // Pass the audio name
        .then(() => {
          setFileURL(URL.createObjectURL(new Blob([audioBlob])));
          history.push("/edit"); // Navigate to the edit page
        })
        .catch((error) => {
          console.error("Failed to add audio file to IndexedDB:", error);
        });
    } catch (error) {
      console.error("Error reading audio file:", error);
    }
  };

  return (
    <div className='upload-audio'>
      <i style={{ color: "#531A65" }} className='material-icons audio-icon'>
        library_music
      </i>
      <h1>Upload your audio file here</h1>
      <input
        type='file'
        onChange={handleFileUpload}
        id='file'
        ref={inputFile}
        style={{ display: "none" }}
        accept='audio/*'
      />
      <button
        onClick={() => inputFile.current.click()}
        className='upload-btn mt-10 transition-all ease-in delay-75'
      >
        Upload
      </button>
      <button
        onClick={handleResetIndexedDB}
        className='bg-red-700 text-white p-3 font-semibold rounded-full mt-4 transition-all ease-in delay-75'
      >
        Reset Database
      </button>

      {/* Display uploaded audio files */}
      <div className='mt-4'>
        <h2 className='text-xl font-semibold mb-2'>Uploaded Audio Files:</h2>
        <ul>
          {uploadedAudioFiles.map((audio, index) => (
            <li
              key={index}
              onClick={() => {
                // Handle navigation here
                // You can set the selected audio file URL and then navigate
                // Remember to update the below line according to your code structure
                setFileURL(URL.createObjectURL(new Blob([audio.data])));
                history.push("/edit");
              }}
              className='cursor-pointer text-blue-500 text-xl'
            >
              {audio.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadAudio;
