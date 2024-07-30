import { useState } from "react";
import ButtonComp from "./Button";
import InputComp from "./Input";
import toast from "react-hot-toast";
import { emailRegex } from "./Pages/LoginSignup";
import { auth, sendPasswordResetEmail } from "../config/firebase.config";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import "../config/i18Next";
import { MdOutlineAttachEmail, MdSend } from "react-icons/md";

function ForgotPasswordModalComp({ open, setOpen }) {
  const [forgotEmail, setForgotEmail] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const { t } = useTranslation();

  const handleForgotEmail = async () => {
    if (!forgotEmail) {
      toast.error("Plese enter email.");
      return;
    }

    if (!emailRegex.test(forgotEmail)) {
      toast.error("Invalid email.");
      return;
    }

    await sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        toast.success(
          "Password request granted successfully. Please check your invox and reset password."
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Please try again.");
      });
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={handleClose}
        footer={[
          <div key="footer" className="flex justify-end items-center gap-2">
            <ButtonComp clickOnUniversalBtn={handleClose} title={t("cancel")} />
          </div>,
        ]}
      >
        <div className="flex flex-col justify-center items-start gap-4 mt-10">
          <InputComp
            inputType="email"
            inputValue={forgotEmail}
            inputOnChange={(e) => setForgotEmail(e.target.value)}
            inputPlaceHolder={t("enterEmail")}
            inputAddonAfter={
              <MdOutlineAttachEmail className="dark:text-darkSecondary" />
            }
          />
          <ButtonComp
            title={t("sendRequest")}
            clickOnUniversalBtn={handleForgotEmail}
            btnIcon={<MdSend />}
          />
        </div>
      </Modal>
    </>
  );
}
export default ForgotPasswordModalComp;
