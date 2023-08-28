import React, { createContext, useState } from "react";

const FileContext = createContext();

const FileContextProvider = ({ children }) => {
  const [fileURL, setFileURL] = useState("");
  const [selectedAudio, setSelectedAudio] = useState({
    name: "",
    url: "",
  }); // Initialize with empty values

  return (
    <FileContext.Provider
      value={{ fileURL, setFileURL, selectedAudio, setSelectedAudio }}
    >
      {children}
    </FileContext.Provider>
  );
};

export { FileContext, FileContextProvider };
