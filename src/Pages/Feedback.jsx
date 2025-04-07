// Libraries Imports
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdSend } from "react-icons/md";
import { MdOutlineAttachEmail } from "react-icons/md";
import toast from "react-hot-toast";
import TextArea from "antd/es/input/TextArea";
import { SiNamecheap } from "react-icons/si";
// Local Imports
import InputComp from "../Components/Input";
import FloatBtnComp from "../Components/FloatBtn";
import ButtonComp from "../Components/Button";
import DropDownComp from "../Components/DropDown";
import "../Config/i18Next";
import { emailRegex } from "../Constants/constants";

function FeedbackPage() {
  const [selectedField, setSelectedField] = useState("");
  const [aboutSelectedField, setAboutSelectedField] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { t } = useTranslation();

  const handleFeedback = async () => {
    if (!name) {
      toast.error("Please enter your name!");
      return;
    }

    if (!email) {
      toast.error("Please enter an email!");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email!");
      return;
    }

    if (!selectedField) {
      toast.error("Please select a field first!");
      return;
    }

    if (!aboutSelectedField) {
      toast.error("Please write about the selected field!");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xvoewqbe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          selectedField,
          aboutSelectedField,
        }),
      });

      if (response.ok) {
        toast.success("Thank you for your feedback!");
        setSelectedField("");
        setAboutSelectedField("");
        setEmail("");
        setName("");
      } else {
        toast.error("Please try again!");
      }
    } catch (error) {
      toast.error("Please try again!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark:bg-darkPrimary dark:text-darkSecondary">
      <h1 className="text-4xl font-bold text-center">{t("feedbackForm")}</h1>
      <div className="flex flex-col justify-center items-center w-[50%] gap-4 mt-6">
        <InputComp
          inputType="text"
          inputValue={name}
          inputOnChange={(e) => setName(e.target.value)}
          inputPlaceHolder={t("enterName")}
          inputAddonAfter={<SiNamecheap className="dark:text-darkSecondary" />}
        />
        <InputComp
          inputType="email"
          inputValue={email}
          inputOnChange={(e) => setEmail(e.target.value)}
          inputPlaceHolder={t("name@gmail.com")}
          inputAddonAfter={
            <MdOutlineAttachEmail className="dark:text-darkSecondary" />
          }
        />
        <DropDownComp
          selectedField={selectedField}
          setSelectedField={setSelectedField}
        />
        <TextArea
          size="large"
          value={aboutSelectedField}
          onChange={(e) => setAboutSelectedField(e.target.value)}
          placeholder={t("aboutField")}
          autoSize
        />
        <ButtonComp
          btnType="button"
          btnIcon={<MdSend />}
          clickOnUniversalBtn={handleFeedback}
          title="Send Us"
        />
      </div>
      <FloatBtnComp />
    </div>
  );
}

export default FeedbackPage;
