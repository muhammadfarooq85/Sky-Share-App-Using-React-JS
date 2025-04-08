// Libraries Imports
import { useState, useContext } from "react";
import { Progress } from "antd";
import toast from "react-hot-toast";
import { MdFilePresent, MdDelete } from "react-icons/md";
// Local Imports
import ButtonComp from "../Components/Button";
import DropzoneComp from "../Components/DropZone";
import {
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  storage,
  databaseRef,
  database,
  set,
  push,
} from "../Config/firebase.config";
import { UserContext } from "../Context/UserContext";
import FilesModalComp from "../Components/FilesModal";
import FloatBtnComp from "../Components/FloatBtn";
import { useTranslation } from "react-i18next";
import InputComp from "../Components/Input";
import "../Config/i18Next";
import { passwordRegex } from "../Constants/constants";
import LoaderComp from "../Components/Loader";

function FilesPage() {
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesPassword, setFilesPassword] = useState("");
  const [userKey, setUserKey] = useState("");
  const { isUser } = useContext(UserContext);
  const { t } = useTranslation();

  const handleFileModal = () => {
    if (!filesPassword) {
      toast.error("Please provide a password!");
      return;
    }

    if (!passwordRegex.test(filesPassword)) {
      toast.error("Invalid password!");
      return;
    }
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
    toast.success("File selected. Now, move forward!");
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
      toast.error("Please select files first!");
      return;
    }
    setFiles([]);
    toast.success("All files are deleted successfully!");
  };

  const isImage = (file) => file.type.startsWith("image/");

  const handleAllFilesUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files first!");
      return;
    }

    if (files.length > 4) {
      toast.error("You can upload only 4 files!");
      return;
    }

    if (!filesPassword) {
      toast.error("Please provide a password!");
      return;
    }
    if (!passwordRegex.test(filesPassword)) {
      toast.error(
        "Password must include one uppercase letter, one lowercase letter, one digit, one special character, and be 8 characters long."
      );
      return;
    }

    try {
      if (!isUser) {
        toast.error("Please login first!");
        return;
      }
      const fileURLs = [];
      for (let i = 0; i < files.length; i++) {
        const downloadURL = await upload(files[i].file, i);
        if (downloadURL) {
          fileURLs.push(downloadURL);
        }
      }

      const newSharedFilesRef = push(databaseRef(database, "sharedFiles"));
      await set(newSharedFilesRef, {
        allFiles: fileURLs,
        filesPassword,
      });
      toast.success("Your files were uploaded successfully.");
      setUserKey(newSharedFilesRef.key);
      setFilesPassword("");
      setFiles([]);
      setProgress(0);
    } catch (error) {
      toast.error("An error occurred while uploading files. Please try again.");
    }
  };

  const upload = (file, i) => {
    if (file.size > 1048576 * 5) {
      toast.error("Each file must be less than 5MB.");
      return Promise.reject(new Error("File size exceeds 5MB"));
    }

    return new Promise((resolve, reject) => {
      const storageFilesRef = storageRef(
        storage,
        `sharedFiles/${filesPassword}/${i}`
      );
      const uploadTask = uploadBytesResumable(storageFilesRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              toast.error("User doesn't have permission to access the object.");
              break;
            case "storage/canceled":
              toast.error("User canceled the upload.");
              break;
            case "storage/unknown":
              toast.error("Unknown error occurred. Please try again.");
              break;
            default:
              toast.error("An error occurred. Please try again.");
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
    <div className="dark:bg-darkPrimary dark:text-darkSecondary">
      <div className="flex justify-end items-end mb-2">
        <ButtonComp
          btnType="button"
          clickOnUniversalBtn={handleDleteAllFiles}
          title={t("deleteAll")}
          btnIcon={<MdDelete />}
        />
      </div>
      {progress > 0 && (
        <div className="flex justify-center items-center w-full">
          <Progress strokeLinecap="butt" percent={progress} />
        </div>
      )}
      <div className="mainTexts flex flex-col justify-between items-start min-h-screen w-full">
        <div className="filesDiv flex justify-start items-center flex-wrap">
          {files.map((fileObj, index) => (
            <div key={index} className="p-2 relative">
              {fileObj?.loading && isImage(fileObj?.file) && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                  <LoaderComp />
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
      <span className="text-lg text-red-900">{t("noteFiles")}</span>
      <InputComp
        inputType="password"
        inputValue={filesPassword}
        inputOnChange={(e) => setFilesPassword(e.target.value)}
        inputPlaceHolder=" ****** "
      />
      <div className="filesBtn flex justify-end items-end gap-2 p-4">
        <ButtonComp
          btnType="button"
          title={t("viewfiles")}
          clickOnUniversalBtn={handleFileModal}
        />
        <ButtonComp
          btnType="button"
          title={t("save")}
          clickOnUniversalBtn={handleAllFilesUpload}
        />
      </div>
      <FilesModalComp
        open={open}
        setOpen={setOpen}
        userKey={userKey}
        filesPassword={filesPassword}
        setUserKey={setUserKey}
        handleFileModal={handleFileModal}
      />
      <FloatBtnComp />
    </div>
  );
}

export default FilesPage;
