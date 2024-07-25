import { useEffect, useState } from "react";
import ButtonComp from "../Button";
import { GrInstallOption } from "react-icons/gr";
import Image3DComp from "../Image3D";
import fr from "../../assets/austin-distel-WO23uj_8EUU-unsplash.png";
import FloatBtnComp from "../FloatBtn";

function DownloadPage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    }
  };
  return (
    <div>
      <div className="App flex flex-col items-center justify-center gap-2 min-h-screen">
        <ButtonComp
          title="Install App"
          btnIcon={<GrInstallOption />}
          clickOnUniversalBtn={handleInstallClick}
        />
        <Image3DComp src={fr} />
      </div>
      <FloatBtnComp />
    </div>
  );
}

export default DownloadPage;
