import { useState } from "react";
import ButtonComp from "../Button";
import DropzoneComp from "../DropZone";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { MdFolderDelete } from "react-icons/md";

function FilesPage() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      loading: true,
    }));
    console.log(acceptedFiles.size);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    handleFileUpload(acceptedFiles);
    toast.success("File selected. Now, move forward.");
  };

  const handleImageLoad = (index) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, loading: false } : file
      )
    );
  };

  const removeImage = (index) => {
    files.splice(index, 1);
  };

  return (
    <div>
      <div className="mainTexts flex flex-col justify-between items-start min-h-screen w-full">
        <div className="flex justify-start items-center flex-wrap">
          {files.map((fileObj, index) => (
            <div key={index} className="p-2 relative">
              {fileObj.loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                  <ClipLoader size={32} color={"#000"} />
                </div>
              )}
              <div className="flex flex-col justify-center items-center cursor-pointer relative">
                <MdFolderDelete
                  onClick={() => removeImage(index)}
                  className="absolute text-[#f3f3f3]"
                  size={50}
                />
                <img
                  src={URL.createObjectURL(fileObj.file)}
                  alt={`file-preview-${index}`}
                  className={`w-32 h-32 object-cover rounded-md ${
                    fileObj.loading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => handleImageLoad(index)}
                />
                <span>{fileObj.file.name.slice(0, 5)}{file}</span>
              </div>
            </div>
          ))}
          <DropzoneComp onDrop={onDrop} />
        </div>
      </div>
      <div className="filesBtn flex justify-end items-end gap-2 p-4">
        <ButtonComp title="Clear" onClick={() => setFiles([])} />
        <ButtonComp title="Save" />
      </div>
    </div>
  );
}

export default FilesPage;
