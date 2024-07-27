import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Content, Footer, Sider } = Layout;
import { useState } from "react";
import { GrWorkshop } from "react-icons/gr";
import { VscDesktopDownload, VscFeedback } from "react-icons/vsc";
import { RiContactsBook3Line } from "react-icons/ri";
import { SiSkyrock } from "react-icons/si";
import { LuScrollText } from "react-icons/lu";
import { FaRegFileImage } from "react-icons/fa6";
import SkySharePage from "./Pages/SkyShare";
import TextsPage from "./Pages/Texts";
import FilesPage from "./Pages/Files";
import FeedbackPage from "./Pages/Feedback";
import ContactPage from "./Pages/Contact";
import DownloadPage from "./Pages/Download";
import HowItWorksPage from "./Pages/HowItWorks";
import SignupLoginFormPage from "./Pages/LoginSignup";
import ThemeToggleComp from "./ThemeToggle";
import LanguageToggleBtnComp from "./LanguageToggleBtn";
import { useTranslation } from "react-i18next";
import { BiSolidUserAccount } from "react-icons/bi";
import "../config/i18Next";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const LayoutComp = () => {
  const { t } = useTranslation();
  const items = [
    getItem(t("menu1"), "1", <SiSkyrock />), //Key is menu 1
    getItem(t("menu2"), "2", <LuScrollText />), //Key is menu
    getItem(t("menu3"), "3", <FaRegFileImage />), //Key is menu 1
    getItem(t("menu4"), "4", <GrWorkshop />), //Key is menu 1
    getItem(t("menu5"), "5", <VscDesktopDownload />), //Key is menu 1
    getItem(t("menu6"), "6", <VscFeedback />), //Key is menu 1
    getItem(t("menu7"), "7", <RiContactsBook3Line />), //Key is menu 1
    getItem(t("menu8"), "8", <BiSolidUserAccount />), //Key is menu 1
  ];

  const [collapsed, setCollapsed] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState([t("home"), items[0].label]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    const selectedItem = items.find((item) => item.key === key);
    setBreadcrumb([t("home"), selectedItem.label]);
    setSelectedMenuItem(key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return (
          <>
            <SkySharePage />
          </>
        );
      case "2":
        return (
          <>
            <TextsPage />
          </>
        );
      case "3":
        return (
          <>
            <FilesPage />
          </>
        );
      case "4":
        return (
          <>
            <HowItWorksPage />
          </>
        );
      case "5":
        return (
          <>
            <DownloadPage />
          </>
        );
      case "6":
        return (
          <>
            <FeedbackPage />
          </>
        );
      case "7":
        return (
          <>
            <ContactPage />
          </>
        );
      case "8":
        return (
          <>
            <SignupLoginFormPage />
          </>
        );
      default:
        return <>Bill is a cat.</>;
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        width="170px"
        className="layoutTrigger"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="sm"
      >
        <Menu
          className="layoutMenu"
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="dark:bg-darkPrimary">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div className="breadCrumbDiv flex justify-between items-center">
            <Breadcrumb
              className="dark:text-darkSecondary"
              style={{
                margin: "16px 0",
              }}
            >
              {breadcrumb.map((crumb, index) => (
                <Breadcrumb.Item
                  key={index}
                  className="dark:text-darkSecondary"
                >
                  {crumb}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div className="flex justify-center items-center ">
              <ThemeToggleComp />
              <LanguageToggleBtnComp />
            </div>
          </div>
          <div
            className="bg-[#fff] dark:bg-darkPrimary p-6"
            style={{
              minHeight: 620,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <span className="font-light dark:text-darkPrimary">
            {t("productCreated")}
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
