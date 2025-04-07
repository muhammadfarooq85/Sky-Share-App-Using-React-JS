// Libraries Imports
import { Modal, Result } from "antd";
import PropTypes from "prop-types";
import ButtonComp from "./Button";
import { useEffect, useState, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MdDownload, MdFilePresent } from "react-icons/md";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
// Local Imports
import {
  databaseRef,
  database,
  onValue,
  remove,
  storage,
  storageRef,
  deleteObject,
  listAll,
} from "../Config/firebase.config";
import "../Config/i18Next";
import LoaderComp from "../Components/Loader";

function FilesModalComp({ open, setOpen, userKey, setUserKey, filesPassword }) {
  const [storageFiles, setStorageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    const starCountRef = databaseRef(database, "sharedFiles");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        for (const key in data) {
          if (data[key].filesPassword === filesPassword) {
            toast.success("Files decrypted successfuly.");
            setStorageFiles(data[key].allFiles);
            setIsFile(data[key].allFiles && data[key].allFiles.length > 0);
            setUserKey(key);
            setOpen(true);
          }
        }
      } else {
        setStorageFiles([]);
        setIsFile(false);
      }
      setIsLoading(false);
    });
  }, [filesPassword, setOpen, setUserKey]);

  useEffect(() => {
    if (filesPassword) {
      fetchFiles();
    }
  }, [filesPassword, fetchFiles]);

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
      .catch(() => toast.error("An error occurred while downloading files."))
      .finally(() => setIsLoading(false));
  };

  const clearAllFiles = async () => {
    setIsLoading(true);
    try {
      const listRef = storageRef(storage, `sharedFiles/${filesPassword}`);
      const res = await listAll(listRef);

      const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
      await Promise.all(deletePromises);

      // Remove the database entry for sharedFiles
      await remove(databaseRef(database, `sharedFiles/${userKey}`));

      toast.success("All files deleted successfully.");
      handleClose();
    } catch (error) {
      toast.error("Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
                <ButtonComp
                  btnType="button"
                  clickOnUniversalBtn={handleClose}
                  title="Cancel"
                />
                <ButtonComp
                  btnType="button"
                  title={t("clearAll")}
                  clickOnUniversalBtn={clearAllFiles}
                />
                <ButtonComp
                  btnType="button"
                  title={t("downloadAll")}
                  btnIcon={<MdDownload />}
                  clickOnUniversalBtn={downloadAllFiles}
                />
              </div>
            ) : (
              <ButtonComp
                btnType="button"
                clickOnUniversalBtn={handleClose}
                title={t("cancel")}
              />
            )}
          </div>,
        ]}
      >
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <LoaderComp />
          </div>
        ) : !isFile ? (
          <Result status="500" subTitle="Sorry, Files are not uploaded yet." />
        ) : (
          <div className="flex flex-col justify-center items-center">
            {storageFiles.map((storageFile, index) => {
              const { name, type, URL } = storageFile;
              return (
                <div
                  className="flex flex-col justify-center items-center gap-2"
                  key={index}
                  style={{ width: "50%" }}
                >
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
                    <MdFilePresent size={150} />
                  )}
                  <span className="font-semibold text-center">{name}</span>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </>
  );
}

FilesModalComp.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  userKey: PropTypes.string.isRequired,
  setUserKey: PropTypes.func.isRequired,
  filesPassword: PropTypes.string.isRequired,
};

export default FilesModalComp;
