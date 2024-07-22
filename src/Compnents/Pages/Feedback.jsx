import { Input } from "antd";
import { useState } from "react";
import ButtonComp from "../Button";
import { RiStarSLine } from "react-icons/ri";
import DropDownComp from "../DropDown";
import { MdSend } from "react-icons/md";
import { MdOutlineAttachEmail } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";

function FeedbackPage() {
  const [colorRate1, setColorRate1] = useState("");
  const [colorRate2, setColorRate2] = useState("");
  const [colorRate3, setColorRate3] = useState("");
  const [colorRate4, setColorRate4] = useState("");
  const [colorRate5, setColorRate5] = useState("");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h3 className="text-4xl font-bold text-center">Feedback Form</h3>
      <div className="flex flex-col justify-center items-center w-[50%] gap-2 mt-6">
        <p className="text-2xl text-left">Please Share your opinion.</p>
        <p className="text-xl text-left font-semibold">Rate our services</p>
        <div className="flex justify-center items-center">
          <RiStarSLine
            color={colorRate1}
            size={50}
            onClick={() => setColorRate1("green")}
          />
          <RiStarSLine
            color={colorRate2}
            size={50}
            onClick={() => setColorRate2("green")}
          />
          <RiStarSLine
            color={colorRate3}
            size={50}
            onClick={() => setColorRate3("green")}
          />
          <RiStarSLine
            color={colorRate4}
            size={50}
            onClick={() => setColorRate4("green")}
          />
          <RiStarSLine
            color={colorRate5}
            size={50}
            onClick={() => setColorRate5("green")}
          />
        </div>
        <h3 className="text-xl font-semibold">Which field can be improved?</h3>
        <div className="w-[100%]">
          <DropDownComp />
        </div>
        <div className="feedbackTextArea w-[100%]">
          <TextArea
            size="large"
            placeholder="Write about the fileds here.."
            autoSize
          />
        </div>
        <Input
          size="large"
          placeholder="Enter Email"
          addonAfter={<MdOutlineAttachEmail />}
        />
        <ButtonComp title="Send Us" btnIcon={<MdSend />} />
      </div>
    </div>
  );
}
export default FeedbackPage;
