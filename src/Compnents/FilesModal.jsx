import { Modal, Result } from "antd";
import ButtonComp from "./Button";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  databaseRef,
  database,
  onValue,
  remove,
  storage,
  storageRef,
  deleteObject,
  listAll,
  set,
} from "../config/firebase.config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdDownload, MdFilePresent, MdDelete } from "react-icons/md";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

function FilesModalComp({ open, setOpen }) {
  const [storageFiles, setStorageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const starCountRef = databaseRef(database, "sharedFiles");
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStorageFiles(data.allFiles || []);
        setIsFile(data.allFiles && data.allFiles.length > 0);
      } else {
        setStorageFiles([]);
        setIsFile(false);
      }
      setIsLoading(false);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, [open]);

  const clearAllFiles = async () => {
    setIsLoading(true);
    try {
      const listRef = storageRef(storage, "sharedFiles/");
      const res = await listAll(listRef);

      const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
      await Promise.all(deletePromises);

      // Remove the database entry for sharedFiles
      await remove(databaseRef(database, "sharedFiles"));

      toast.success("All files deleted successfully.");
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAllFiles = () => {
    setIsLoading(true);
    const zip = new JSZip();
    const folder = zip.folder("project");

    const promises = storageFiles.map((file) =>
      fetch(file.URL)
        .then((response) => {
          if (response.status === 200 || response.status === 0) {
            return response.blob();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((blob) => folder.file(file.name, blob))
    );

    Promise.all(promises)
      .then(() => zip.generateAsync({ type: "blob" }))
      .then((blob) => saveAs(blob, "MULTIPLE-FILES.zip"))
      .catch((e) => toast.error("An error occurred while downloading files."))
      .finally(() => setIsLoading(false));
  };

  const selctedFileRemove = async (index) => {
    setIsLoading(true);
    try {
      const selectedFileRef = storageRef(storage, `sharedFiles/${index}`);
      await deleteObject(selectedFileRef);

      const starCountRef = databaseRef(database, "sharedFiles");
      const snapshot = await get(starCountRef);
      const data = snapshot.val();
      if (data) {
        let allFiles = data.allFiles || [];
        allFiles.splice(index, 1);
        await set(databaseRef(database, "sharedFiles"), {
          allFiles: allFiles,
        });
        setStorageFiles(allFiles);
        toast.success("Selected File deleted successfully.");
      }
    } catch (error) {
      toast.error("Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onCancel={handleClose}
        footer={[
          <div
            key="footer"
            className="flex flex-col justify-end items-center gap-2"
          >
            {isFile ? (
              <div className="filesModalBtn flex justify-end items-center gap-2">
                <ButtonComp clickOnUniversalBtn={handleClose} title="Cancel" />
                <ButtonComp
                  title="Clear All"
                  clickOnUniversalBtn={clearAllFiles}
                />
                <ButtonComp
                  title="Download All"
                  btnIcon={<MdDownload />}
                  clickOnUniversalBtn={downloadAllFiles}
                />
              </div>
            ) : (
              <ButtonComp clickOnUniversalBtn={handleClose} title="Cancel" />
            )}
          </div>,
        ]}
      >
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <ClipLoader size={100} />
          </div>
        ) : !isFile ? (
          <Result status="500" subTitle="Sorry, Files are not uploaded yet." />
        ) : (
          <div className="flex flex-col justify-center items-center">
            {storageFiles.map((storageFile, index) => {
              const { name, type, URL } = storageFile;
              return (
                <div
                  className="relative flex flex-col justify-center items-center gap-2"
                  key={index}
                  style={{ width: "50%" }}
                >
                  <MdDelete
                    className="z-50 cursor-pointer absolute text-red-600 top-1 right-1"
                    size={30}
                    onClick={() => selctedFileRemove(index)}
                  />
                  {type.startsWith("image/") ? (
                    <div className="flex flex-col justify-center items-center w-full">
                      <LazyLoadImage
                        style={{ borderRadius: "10px", width: "100%" }}
                        src={URL}
                        alt={name}
                        effect="blur"
                      />
                    </div>
                  ) : (
                    <div>
                      <MdFilePresent size={150} />
                    </div>
                  )}
                  <span className="font-semibold text-center">{name}</span>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FilesModalComp;
