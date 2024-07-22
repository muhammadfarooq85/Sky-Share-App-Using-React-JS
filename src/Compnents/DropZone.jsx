import { useDropzone } from "react-dropzone";
import { MdAdd } from "react-icons/md";
import { RiDragDropFill } from "react-icons/ri";

export default function DropzoneComp({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed border-gray-400 rounded-lg p-2"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <RiDragDropFill className="w-20 h-20 cursor-pointer" />
      ) : (
        <MdAdd className="w-20  h-20 cursor-pointer" />
      )}
      <p className="text-center text-sm font-semibold">
        Add Files or <br /> drag drop
      </p>
    </div>
  );
}
