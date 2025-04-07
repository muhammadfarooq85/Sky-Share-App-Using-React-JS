// Libraries Imports
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
// Local Imports
import {
  database,
  set,
  databaseRef,
  remove,
  onValue,
  push,
} from "../Config/firebase.config";
import { UserContext } from "../Context/UserContext";
import FloatBtnComp from "../Components/FloatBtn";
import "../Config/i18Next";
import TextAreaComp from "../Components/TextArea";
import ButtonComp from "../Components/Button";
import InputComp from "../Components/Input";
import { passwordRegex } from "../Constants/constants";
import LoaderComp from "../Components/Loader";

function TextsPage() {
  const [textValue, setTextValue] = useState("");
  const [textPassword, setTextPasssword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isText, setIsText] = useState(false);
  const [userKey, setUserKey] = useState("");
  const { t } = useTranslation();
  const { isuser } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    const starCountRef = databaseRef(database, "sharedText");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        for (const key in data) {
          if (data[key].textPassword === textPassword) {
            toast.success("Text decrypted successfuly.");
            setTextValue(data[key].textValue);
            setUserKey(key);
            setIsText(true);
            break;
          }
        }
      }
      setLoading(false);
    });
  }, [textPassword]);

  const uploadText = async () => {
    if (textValue === "") {
      toast.error("Please write some text first before sharing!");
      return;
    }
    if (textPassword === "") {
      toast.error("Please provide password!");
      return;
    }
    if (!passwordRegex.test(textPassword)) {
      toast.error(
        "Password must be One uppercase, one lowerCase, one digit and one special character. Length should be 8!"
      );
      return;
    }
    try {
      if (!isuser) {
        toast.error("Please login or signup first!");
        return;
      }
      const newTextRef = push(databaseRef(database, "sharedText"));
      await set(newTextRef, {
        textValue,
        textPassword,
      });
      toast.success("Your text uploaded successfully.");
      setUserKey(newTextRef.key);
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  const clearUploadText = async () => {
    if (!userKey) {
      toast.error("No text to delete.");
      return;
    }
    try {
      await remove(databaseRef(database, `sharedText/${userKey}`));
      toast.success("Your shared text deleted successfully.");
      setIsText(false);
      setTextValue("");
      setUserKey(""); // Clear the saved key
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  const copyText = () => {
    window.navigator.clipboard.writeText(textValue);
    toast.success("Text Copied Successfully.");
  };

  if (loading) {
    return (
      <div className="loader-container h-screen">
        <LoaderComp />
      </div>
    );
  }

  return (
    <>
      <div className="mainTexts flex flex-col justify-between items-end min-h-screen w-full dark:bg-darkPrimary">
        <div className="w-full">
          <TextAreaComp
            textValue={textValue}
            setTextValue={setTextValue}
            textAreaPlaceHolder={t("textAreaPlaceHolder")}
          />
        </div>
        <div className="w-full">
          <span className="text-lg text-red-900">{t("noteTexts")}</span>
          <InputComp
            inputType="password"
            inputValue={textPassword}
            inputOnChange={(e) => setTextPasssword(e.target.value)}
            inputPlaceHolder=" ****** "
          />
        </div>
      </div>
      <div className="textsBtn flex justify-end items-center gap-2 mt-2 dark:bg-darkPrimary ">
        {isText ? (
          <div className="textsBtn flex justify-end items-center gap-2">
            <ButtonComp
              btnType="button"
              title={t("clear")}
              clickOnUniversalBtn={clearUploadText}
            />
            <ButtonComp
              btnType="button"
              title={t("copy")}
              clickOnUniversalBtn={copyText}
            />
          </div>
        ) : (
          <ButtonComp
            btnType="button"
            title={t("save")}
            clickOnUniversalBtn={uploadText}
          />
        )}
      </div>
      <FloatBtnComp />
    </>
  );
}

export default TextsPage;
