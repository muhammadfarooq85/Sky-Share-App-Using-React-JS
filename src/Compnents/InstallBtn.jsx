import { GrInstallOption } from "react-icons/gr";
import ButtonComp from "./Button";
import { useTranslation } from "react-i18next";
import "../config/i18Next";

function InstallButtonComp() {
  const { t } = useTranslation();

  return <ButtonComp title={t("installApp")} btnIcon={<GrInstallOption />} />;
}

export default InstallButtonComp;
