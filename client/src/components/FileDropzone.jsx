import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileDropzone = ({ setFile }) => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  const dropzoneMessage = isDragActive
    ? "Drop the file here ..."
    : "Drag 'n' drop a CSV file here, or click to search your machine.";

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="container mx-auto w-full h-24 p-2 bg-slate-200 rounded my-2 flex justify-center items-center cursor-pointer">
        <p className="text-slate-600">{dropzoneMessage}</p>
      </div>
    </div>
  );
};

export default FileDropzone;
