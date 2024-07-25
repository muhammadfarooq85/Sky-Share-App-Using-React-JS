import { useState, useEffect } from "react";
import ButtonComp from "../Button";
import DropzoneComp from "../DropZone";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { MdFilePresent, MdDelete } from "react-icons/md";
import {
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  databaseRef,
  database,
  set,
} from "../../config/firebase.config";
import { Progress } from "antd";
import FilesModalComp from "../FilesModal";
import FloatBtnComp from "../FloatBtn";

function FilesPage() {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState([]);

  const handleFileModal = () => {
    setOpen(true);
  };

  const onFileUpload = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      loading: isImage(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const onDrop = (acceptedFiles) => {
    onFileUpload(acceptedFiles);
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
    toast.success("All files are deleted successfully.");
    setFiles([]);
  };

  const isImage = (file) => {
    return file.type.startsWith("image/");
  };

  const handleAllFilesUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files first.");
      return;
    }

    if (files.length > 4) {
      toast.error("You can upload only 4 files.");
      return;
    }

    try {
      let fileURLs = [];
      for (let i = 0; i < files.length; i++) {
        const downloadURL = await upload(files[i].file, i);
        if (downloadURL) {
          fileURLs.push(downloadURL);
        }
      }

      await set(databaseRef(database, "sharedFiles"), {
        allFiles: fileURLs,
      });

      toast.success("Your files uploaded successfully.");
      setFiles([]);
      setProgress(0);
    } catch (error) {
      toast.error("An error occurred while uploading files. Please try again.");
      console.error("Upload error:", error);
    }
  };

  const upload = (file, i) => {
    if (file.size > 1048576 * 5) {
      toast.error("Each file must be less than 5Mb.");
      return;
    }
    return new Promise((resolve, reject) => {
      const storageFilesRef = storageRef(storage, `sharedFiles/${i}`);
      const uploadTask = uploadBytesResumable(storageFilesRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              toast.success("Please stay patient!");
              setProgress(progress);
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              toast.error("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              toast.error("User canceled the upload");
              break;
            case "storage/unknown":
              toast.error("Unknown error occurred. Please try again.");
              break;
          }
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ URL: downloadURL, type: file.type, name: file.name });
          } catch (error) {
            reject(error);
            toast.error(
              "An error occurred while getting the download URL. Please try again."
            );
          }
        }
      );
    });
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
      {progress > 0 ? (
        <div className="flex justify-center items-center w-full">
          <Progress strokeLinecap="butt" percent={progress} />
        </div>
      ) : (
        ""
      )}
      <div className="mainTexts flex flex-col justify-between items-start min-h-screen w-full">
        <div className="filesDiv flex justify-start items-center flex-wrap">
          {files.map((fileObj, index) => (
            <div key={index} className="p-2 relative">
              {fileObj.loading && isImage(fileObj.file) && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                  <ClipLoader size={32} color={"#000"} />
                </div>
              )}
              <div className="flex flex-col justify-center items-center cursor-pointer relative">
                <MdDelete
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
        <ButtonComp title="View Files" clickOnUniversalBtn={handleFileModal} />
        <ButtonComp title="Save" clickOnUniversalBtn={handleAllFilesUpload} />
      </div>
      <FilesModalComp open={open} setOpen={setOpen} />
      <FloatBtnComp />
    </div>
  );
}

export default FilesPage;
