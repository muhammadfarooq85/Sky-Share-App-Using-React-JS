import { Breadcrumb, Layout, Menu, theme, Avatar, Drawer, Button } from "antd";
const { Content, Footer, Sider } = Layout;
import { useState, useContext } from "react";
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
import SettingsPage from "./Pages/Settings";
import ThemeToggleComp from "./ThemeToggle";
import LanguageToggleBtnComp from "./LanguageToggleBtn";
import { useTranslation } from "react-i18next";
import { MdSettings, MdMenu } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import "../config/i18Next";
import { UserContext } from "../Context/UserContext";
import ButtonComp from "./Button";

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
    getItem(t("menu1"), "1", <SiSkyrock />),
    getItem(t("menu2"), "2", <LuScrollText />),
    getItem(t("menu3"), "3", <FaRegFileImage />),
    getItem(t("menu4"), "4", <GrWorkshop />),
    getItem(t("menu5"), "5", <VscDesktopDownload />),
    getItem(t("menu6"), "6", <VscFeedback />),
    getItem(t("menu7"), "7", <RiContactsBook3Line />),
    getItem(t("menu8"), "8", <BiSolidUserAccount />),
    getItem(t("menu9"), "9", <MdSettings />),
  ];

  const { user, userName } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState([t("home"), items[0].label]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const breadcrumbItems = breadcrumb.map((crumb, index) => ({
    title: <span className="dark:text-darkSecondary">{crumb}</span>,
    key: index,
  }));

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    const selectedItem = items.find((item) => item.key === key);
    setBreadcrumb([t("home"), selectedItem.label]);
    setSelectedMenuItem(key);
    if (window.innerWidth <= 500) {
      setDrawerVisible(false); // Close drawer on menu item click for small screens
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <SkySharePage />;
      case "2":
        return <TextsPage />;
      case "3":
        return <FilesPage />;
      case "4":
        return <HowItWorksPage />;
      case "5":
        return <DownloadPage />;
      case "6":
        return <FeedbackPage />;
      case "7":
        return <ContactPage />;
      case "8":
        return <SignupLoginFormPage />;
      case "9":
        return user ? (
          <SettingsPage />
        ) : (
          <h1 className="text-4xl font-bold text-center">{t("pleaseLogin")}</h1>
        );
      default:
        return <>Bill is a cat.</>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
      <ButtonComp
        classes="drawerButton top-3 left-2"
        btnIcon={<MdMenu className="w-6 h-6" />}
        clickOnUniversalBtn={() => setDrawerVisible(true)}
      />
      <Drawer
        title={t("menu")}
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Drawer>
      <Layout className="dark:bg-darkPrimary">
        <Content style={{ margin: "0 16px" }}>
          <div className="breadCrumbDiv flex justify-between items-center ">
            <Breadcrumb
              className="dark:text-darkSecondary"
              style={{ margin: "16px 0" }}
              items={breadcrumbItems}
            />
            <div className="flex justify-center items-center gap-4 breadCrumbRight">
              <ThemeToggleComp />
              <LanguageToggleBtnComp />
              <Avatar className="bg-primary">
                {userName !== null ? userName.slice(0, 1).toUpperCase() : "U"}
              </Avatar>
            </div>
          </div>
          <div
            className="bg-[#fff] dark:bg-darkPrimary p-6"
            style={{ minHeight: 620, borderRadius: borderRadiusLG }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <span className="font-light dark:text-darkSecondary">
            {t("productCreated")}
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
