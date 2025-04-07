// Libraries Imports
import { useState } from "react";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { MdOutlineAttachEmail, MdSend } from "react-icons/md";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
// Local Imports
import { emailRegex } from "../Constants/constants";
import ButtonComp from "./Button";
import InputComp from "./Input";
import { auth, sendPasswordResetEmail } from "../Config/firebase.config";
import "../Config/i18Next";

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
      .catch(() => {
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
            <ButtonComp
              btnType="button"
              clickOnUniversalBtn={handleClose}
              title={t("cancel")}
            />
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
            btnType="button"
            title={t("sendRequest")}
            clickOnUniversalBtn={handleForgotEmail}
            btnIcon={<MdSend />}
          />
        </div>
      </Modal>
    </>
  );
}

ForgotPasswordModalComp.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ForgotPasswordModalComp;
