import React, { useContext, useEffect, useState } from "react";
import AudioWaveform from "../components/AudioWaveform";
import { getAllAudioFiles, initializeIndexedDB } from "../IndexedDB";
import { FileContext } from "../contexts/fileContext";

const EditPage = () => {
  const { fileURL } = useContext(FileContext);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    initializeIndexedDB()
      .then((db) => getAllAudioFiles(db))
      .then((audioFiles) => {
        if (audioFiles.length > 0) {
          setAudioUrl(
            URL.createObjectURL(
              new Blob([audioFiles[audioFiles.length - 1].data])
            )
          );
        }
      })
      .catch((error) => {
        console.error("Failed to initialize IndexedDB:", error);
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "1em 0" }}>
        Edit Your Audio File
      </h1>
      <AudioWaveform />
    </div>
  );
};

export default EditPage;
