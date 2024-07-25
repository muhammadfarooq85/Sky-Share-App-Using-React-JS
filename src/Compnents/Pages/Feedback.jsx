import { Input } from "antd";
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

function FeedbackPage() {
  const [colorRate, setColorRate] = useState(Array(5).fill(""));
  const [selectedField, setSelectedField] = useState("");
  const [aboutSelectedField, setAboutSelectedField] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold text-center">Feedback Form</h1>
      <div className="flex flex-col justify-center items-center w-[50%] gap-4 mt-6">
        <p className="text-xl">Please Share your opinion.</p>
        <p className="text-lg font-semibold">Rate our services</p>
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
        <p className="text-lg font-semibold">Which field can be improved?</p>
        <Input
          size="large"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          addonAfter={<SiNamecheap />}
        />
        <Input
          size="large"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          addonAfter={<MdOutlineAttachEmail />}
        />
        <DropDownComp
          selectedField={selectedField}
          setSelectedField={setSelectedField}
        />
        <TextArea
          size="large"
          value={aboutSelectedField}
          onChange={(e) => setAboutSelectedField(e.target.value)}
          placeholder="Write about the field here..."
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
