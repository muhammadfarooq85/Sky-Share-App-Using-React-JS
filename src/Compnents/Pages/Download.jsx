import Image3DComp from "../Image3D";
import installImg from "../../assets/install-img.webp"
import FloatBtnComp from "../FloatBtn";
import InstallButtonComp from "../InstallBtn";

function DownloadPage() {
  return (
    <div className="dark:bg-darkPrimary dark:text-darkSecondary">
      <div className="App flex flex-col items-center justify-center gap-2 min-h-screen">
        <InstallButtonComp />
        <Image3DComp src={installImg} />
      </div>
      <FloatBtnComp />
    </div>
  );
}

export default DownloadPage;
