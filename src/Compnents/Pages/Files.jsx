import { useState } from "react";
import ButtonComp from "../Button";
import DropzoneComp from "../DropZone";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { MdFolderDelete, MdFilePresent, MdDelete } from "react-icons/md";

function FilesPage() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      loading: isImage(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const onDrop = (acceptedFiles) => {
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
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    toast.success("Selected file deleted successfully.");
  };

  const handleDleteAllFiles = () => {
    if (files.length === 0) {
      toast.error("Please select files first.");
      return;
    }
    setFiles([]);
    toast.success("All files are deleted successfully.");
  };

  const isImage = (file) => {
    return file.type.startsWith("image/");
  };

  return (
    <div>
      <div className="flex justify-end items-end mb-2">
        <ButtonComp
          clickOnUniversalBtn={handleDleteAllFiles}
          title="Delete All"
          btnIcon={<MdDelete />}
        />
      </div>
      <div className="mainTexts flex flex-col justify-between items-start min-h-screen w-full">
        <div className="flex justify-center items-center flex-wrap">
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
                  className="absolute text-red-600 top-1 right-1"
                  size={30}
                />
                {isImage(fileObj.file) ? (
                  <img
                    src={URL.createObjectURL(fileObj.file)}
                    alt={`file-preview-${index}`}
                    className={`w-32 h-32 object-cover rounded-md ${
                      fileObj.loading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => handleImageLoad(index)}
                  />
                ) : (
                  <MdFilePresent size={150} />
                )}
                <span className="font-semibold">
                  {fileObj.file.name.slice(0, 5)}
                  {fileObj.file.name.slice(fileObj.file.name.lastIndexOf("."))}
                </span>
              </div>
            </div>
          ))}
          <DropzoneComp onDrop={onDrop} />
        </div>
      </div>
      <div className="filesBtn flex justify-end items-end gap-2 p-4">
        <ButtonComp title="Clear" />
        <ButtonComp title="Save" />
      </div>
    </div>
  );
}

export default FilesPage;
