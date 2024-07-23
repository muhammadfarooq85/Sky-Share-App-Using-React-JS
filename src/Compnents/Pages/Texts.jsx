import TextAreaComp from "../TextArea";
import ButtonComp from "../Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import {
  database,
  set,
  databaseRef,
  remove,
  onValue,
} from "../../config/firebase.config";

function TextsPage() {
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    setLoading(true);
    const starCountRef = databaseRef(database, "sharedText");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTextValue(data.textValue);
        setIsText(true);
        setLoading(false);
      }
      setLoading(false);
    });
  });

  const uploadText = async () => {
    if (textValue === "") {
      toast.error("Please write some text first before sharing.");
      return;
    }

    try {
      await set(ref(database, "sharedText"), {
        textValue,
      });
      toast.success("Your data uploaded successfully.");
    } catch (error) {
      console.log("Please try again.");
    }
  };

  const clearUploadText = async () => {
    try {
      await remove(ref(database, "sharedText"));
      toast.success("Your shared text deleted successfully.");
      setIsText(false);
      setTextValue("");
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  const copyText = () => {
    window.navigator.clipboard.writeText(textValue);
    toast.success("Text Copied Successfully.");
  };

  if (loading) {
    return <ClipLoader size={100} color={"#000"} />;
  }

  return (
    <div>
      <div className="mainTexts flex flex-col justify-between items-end min-h-screen w-full">
        <div className="w-full">
          <TextAreaComp
            textValue={textValue}
            setTextValue={setTextValue}
            textAreaPlaceHolder="Type the text you want to share..."
          />
        </div>
      </div>
      <div className="textsBtn flex justify-end items-center gap-2">
        {isText ? (
          <div className="textsBtn flex justify-end items-center gap-2">
            <ButtonComp title="Clear" clickOnUniversalBtn={clearUploadText} />
            <ButtonComp title="Copy" clickOnUniversalBtn={copyText} />
          </div>
        ) : (
          <ButtonComp title="Save" clickOnUniversalBtn={uploadText} />
        )}
      </div>
    </div>
  );
}

export default TextsPage;
