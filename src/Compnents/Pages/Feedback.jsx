import { useState } from "react";
import { RiStarSLine } from "react-icons/ri";
import DropDownComp from "../DropDown";
import { MdSend } from "react-icons/md";
import { MdOutlineAttachEmail } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";
import toast from "react-hot-toast";
import { SiNamecheap } from "react-icons/si";
import ButtonComp from "../Button";
import FloatBtnComp from "../FloatBtn";
import InputComp from "../Input";
import { useTranslation } from "react-i18next";
import "../../config/i18Next";
import { emailRegex } from "./LoginSignup";

function FeedbackPage() {
  const [colorRate, setColorRate] = useState(Array(5).fill(""));
  const [selectedField, setSelectedField] = useState("");
  const [aboutSelectedField, setAboutSelectedField] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  const { t } = useTranslation();

  const handleFeedback = async () => {
    if (!name) {
      toast.error("Please enter an email.");
      return;
    }
    if (!email) {
      toast.error("Please enter an email.");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email.");
      return;
    }

    if (!selectedField) {
      toast.error("Please select a field.");
      return;
    }

    if (!aboutSelectedField) {
      toast.error("Please write about the selected field.");
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
        toast.success("Thank you for your feedback!")
        setResponse("Thank you for your feedback!");
        setSelectedField("");
        setAboutSelectedField("");
        setEmail("");
        setName("");
        setColorRate(Array(5).fill(""));
      } else {
        setResponse("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setResponse("Oops! Something went wrong. Please try again.");
    }
  };

  const handleStarClick = (index) => {
    const newColorRate = Array(5).fill("");
    newColorRate[index] = "green";
    setColorRate(newColorRate);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark:bg-darkPrimary dark:text-darkSecondary">
      <h1 className="text-4xl font-bold text-center">{t("feedbackForm")}</h1>
      <div className="flex flex-col justify-center items-center w-[50%] gap-4 mt-6">
        <p className="text-xl">{t("shareOpinion")}</p>
        <p className="text-lg font-semibold">{t("rateServices")}</p>
        <div className="flex justify-center items-center">
          {colorRate.map((color, index) => (
            <RiStarSLine
              key={index}
              color={color}
              size={30}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
        <p className="text-lg font-semibold">{t("whichImproved")}</p>
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
          btnIcon={<MdSend />}
          clickOnUniversalBtn={handleFeedback}
          title="Send Us"
        />
        {response && <p>{response}</p>}
      </div>
      <FloatBtnComp />
    </div>
  );
}

export default FeedbackPage;
