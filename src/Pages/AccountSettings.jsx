// Libraries Imports
import { useContext, useEffect, useState } from "react";
import { MdOutlineAttachEmail } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import toast from "react-hot-toast";
// Local Imports
import {
  auth,
  updateEmail,
  signOut,
  updatePassword,
} from "../Config/firebase.config";
import InputComp from "../Components/Input";
import { UserContext } from "../Context/UserContext";
import ButtonComp from "../Components/Button";
import "../Config/i18Next";
import { emailRegex, passwordRegex } from "../Constants/constants";

function SettingsPage() {
  const [prevEmail, setPrevEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  useEffect(() => {
    setPrevEmail(user?.email);
  }, []);

  const handleUpdateEmail = async () => {
    if (!newEmail) {
      toast.error("Please enter an email!");
      return;
    }

    if (!emailRegex.test(newEmail)) {
      toast.error("Invalid email format.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("No user is signed in.");
      return;
    }

    try {
      await updateEmail(user, newEmail);
      toast.success("Email updated successfully.");
    } catch (error) {
      switch (error.code) {
        case "auth/requires-recent-login":
          toast.error("Please re-authenticate and try again.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;
        case "auth/email-already-in-use":
          toast.error("Email is already in use.");
          break;
        default:
          toast.error("Error updating email. Please try again.");
      }
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      toast.error("Please enter password.");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be One uppercase, one lowerCase, one digit and one special character. Length should be 8."
      );
      return;
    }
    await updatePassword(auth.currentUser, newPassword)
      .then(() => {
        toast.success("Password updated successfully.");
      })
      .catch(() => {
        toast.error("Please try again.");
      });
  };

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        toast.success("Successfully signout.");
      })
      .catch(() => {
        toast.error("Please try again.");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 overflow-auto dark:bg-darkPrimary dark:text-darkSecondary">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <h2 className="text-4xl font-bold text-center ">{t("noteSettings")}</h2>
        <div className="flex flex-col gap-2">
          <label className="text-lg">{t("prevEmail")}</label>
          <InputComp
            inputDisabled={true}
            inputType="email"
            inputPlaceHolder=""
            inputValue={prevEmail}
            inputOnChange={(e) => setPrevEmail(e.target.value)}
            inputAddonAfter={
              <MdOutlineAttachEmail className="dark:text-darkSecondary" />
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">{t("newEmail")}</label>
          <InputComp
            inputType="email"
            inputPlaceHolder={t("enterNewEmail")}
            inputValue={newEmail}
            inputOnChange={(e) => setNewEmail(e.target.value)}
            inputAddonAfter={
              <MdOutlineAttachEmail className="dark:text-darkSecondary" />
            }
          />
        </div>
        <ButtonComp
          btnType="button"
          btnIcon={<MdOutlineTipsAndUpdates />}
          title={t("updateEmail")}
          clickOnUniversalBtn={handleUpdateEmail}
        />
        <div className="flex flex-col gap-2">
          <label className="text-lg">{t("newPassword")}</label>
          <InputComp
            inputType="password"
            inputPlaceHolder={t("enterNewPassword")}
            inputValue={newPassword}
            inputOnChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <ButtonComp
          btnType="button"
          btnIcon={<MdOutlineTipsAndUpdates />}
          title={t("updatePassword")}
          clickOnUniversalBtn={handleUpdatePassword}
        />
        <ButtonComp
          btnType="button"
          btnIcon={<LiaSignOutAltSolid />}
          title={t("signout")}
          clickOnUniversalBtn={handleSignOut}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
