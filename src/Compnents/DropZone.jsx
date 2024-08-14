import { useDropzone } from "react-dropzone";
import { MdAdd } from "react-icons/md";
import { RiDragDropFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import "../config/i18Next";

export default function DropzoneComp({ onDrop }) {
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="dropDown border dark:bg-darkSecondary border-dashed border-gray-400 rounded-lg p-2"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <RiDragDropFill className="dark:text-darkPrimary w-20 h-20 cursor-pointer" />
      ) : (
        <MdAdd className="dark:text-darkPrimary w-20 h-20 cursor-pointer" />
      )}
      <p className="text-center text-sm dark:text-darkPrimary">
        {t("addFiles")} <br /> {t("drag")}
      </p>
    </div>
  );
}
