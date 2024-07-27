import Image3DComp from "../Image3D";
import fr from "../../assets/austin-distel-WO23uj_8EUU-unsplash.png";
import FloatBtnComp from "../FloatBtn";
import InstallButtonComp from "../InstallBtn";

function DownloadPage() {
  return (
    <div className="dark:bg-darkPrimary dark:text-darkSecondary">
      <div className="App flex flex-col items-center justify-center gap-2 min-h-screen">
        <InstallButtonComp />
        <Image3DComp src={fr} />
      </div>
      <FloatBtnComp />
    </div>
  );
}

export default DownloadPage;
