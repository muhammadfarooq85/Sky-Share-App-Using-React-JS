// Libraries Imports
import { useTranslation } from "react-i18next";
// Local Imports
import FloatBtnComp from "../Components/FloatBtn";
import "../Config/i18Next";

function HowItWorksPage() {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-darkPrimary dark:text-darkSecondary">
      <div className="mainWork">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <div>
              <h2 className="text-4xl font-bold text-center">
                {t("howItworks")}
              </h2>
            </div>
            <div>
              <p className="text-2xl text-center">{t("sS")}</p>
            </div>
          </div>
          <div className="stepsToWork flex justify-center items-center gap-6 mt-10">
            <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md dark:bg-[#444444] dark:text-darkSecondary">
              <div>
                <h3 className="text-2xl font-bold">{t("step1")}</h3>
              </div>
              <div>
                <h4 className="text-center text-xl">{t("step1Cnt")}</h4>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md dark:bg-[#444444] dark:text-darkSecondary">
              <div>
                <h3 className="text-2xl font-bold">{t("step2")}</h3>
              </div>
              <div>
                <h4 className="text-center text-xl">{t("step2Cnt")}</h4>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md dark:bg-[#444444] dark:text-darkSecondary">
              <div>
                <h3 className="text-2xl font-bold">{t("step3")}</h3>
              </div>
              <div>
                <h4 className="text-center text-xl">{t("step3Cnt")}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatBtnComp />
    </div>
  );
}

export default HowItWorksPage;
