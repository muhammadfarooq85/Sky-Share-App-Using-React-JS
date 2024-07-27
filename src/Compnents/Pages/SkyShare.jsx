import { ReactTyped } from "react-typed";
import { SiSkyrock } from "react-icons/si";
import ButtonComp from "../Button";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useTranslation } from "react-i18next";
import FloatBtnComp from "../FloatBtn";
import "../../config/i18Next";

function SkySharePage() {
  const { t } = useTranslation();

  return (
    <div className="mainWelcome">
      <div className="welocmeCnt flex flex-col justify-center items-center gap-3 min-h-screen dark:bg-darkPrimary dark:text-darkSecondary">
        <SiSkyrock className="text-[#846ea7] w-24 h-24 dark:text-darkSecondary" />
        <h2 className="text-3xl font-medium text-center">{t("HyEveryone")}</h2>
        <h2 className="text-4xl font-medium text-center ">
          {t("WelcometoSkyShare")}
        </h2>
        <ReactTyped
          className="text-4xl font-bold text-center "
          strings={[t("Whatwillyouexplorehere")]}
        />
        <ReactTyped
          className="text-5xl typingEffectInput "
          strings={[
            t("exploreText"),
            t("exploreFiles"),
            t("exploreDownload"),
            t("exploreWorking"),
            t("exploreFeedback"),
            t("exploreContact"),
            t("exploreAccount"),
          ]}
          typeSpeed={60}
          backSpeed={60}
          attr="placeholder"
          loop
        >
          <input
            type="text"
            className=" bg-[#fff] dark:bg-darkPrimary text-center"
            disabled
          />
        </ReactTyped>
        <p className="text-2xl text-center">{t("Letsstart")}</p>
        <div className="tourBtn">
          <ButtonComp
            title={t("LetsExplore")}
            btnIcon={<MdOutlineRestartAlt size={25} />}
          />
        </div>
        <FloatBtnComp />
      </div>
    </div>
  );
}

export default SkySharePage;
