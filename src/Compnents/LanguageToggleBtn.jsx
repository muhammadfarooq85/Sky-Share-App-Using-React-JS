import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggleBtnComp = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="toggle-container">
      <div className="font-bold mr-1"  >En</div>
      <input
        type="checkbox"
        id="toggle-button"
        onChange={(e) => changeLanguage(e.target.checked ? "ur" : "en")}
      />
      <label htmlFor="toggle-button" className="toggle-label">
        <div className="ball"></div>
      </label>
      <div className="font-bold ml-1">Ur</div>
    </div>
  );
};

export default LanguageToggleBtnComp;
