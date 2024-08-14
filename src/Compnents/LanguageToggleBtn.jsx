import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageToggleBtnComp = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      language === "ur" ? "rtl" : "ltr"
    );
  }, [language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div className="toggle-container">
      <label htmlFor="toggle-button" className="font-bold mr-1 ml-1">
        En
      </label>
      <input
        type="checkbox"
        id="toggle-button"
        checked={language === "ur"}
        onChange={(e) => changeLanguage(e.target.checked ? "ur" : "en")}
      />
      <label htmlFor="toggle-button" className="toggle-label">
        <div className="ball"></div>
      </label>
      <label htmlFor="toggle-button" className="font-bold ml-1 mr-1">
        Ur
      </label>
    </div>
  );
};

export default LanguageToggleBtnComp;
