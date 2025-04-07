// Libraries Imports
import { useTranslation } from "react-i18next";
import { MdOutlineAttachEmail, MdLocationOn } from "react-icons/md";
import { SlSocialStumbleupon } from "react-icons/sl";
// Local Imports
import FloatBtnComp from "../Components/FloatBtn";
import "../Config/i18Next";

function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-darkPrimary dark:text-darkSecondary">
      <h3 className="text-center text-4xl font-bold mb-10">{t("contactUs")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md dark:bg-[#444444] dark:text-darkSecondary">
          <MdOutlineAttachEmail size={60} />
          <h4 className="text-2xl ">{t("email")}</h4>
          <p className="text-xl text-center contactEmail">
            famuhammd907@gmail.com
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md dark:bg-[#444444] dark:text-darkSecondary">
          <MdLocationOn size={60} />
          <h4 className="text-2xl">{t("location")}</h4>
          <p className="text-xl text-center">{t("myLocation")}</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md dark:bg-[#444444] dark:text-darkSecondary">
          <SlSocialStumbleupon size={60} />
          <h4 className="text-2xl">{t("socialPlatforms")}</h4>
          <p className="text-xl text-center">{t("mySocial")}</p>
        </div>
      </div>
      <FloatBtnComp />
    </div>
  );
}

export default ContactPage;
