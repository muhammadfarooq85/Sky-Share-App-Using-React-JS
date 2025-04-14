// Libraries Imports
import { useState, useContext } from "react";
import { Breadcrumb, Layout, Menu, theme, Avatar, Drawer } from "antd";
const { Content, Footer, Sider } = Layout;
import { GrWorkshop } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";
import { RiContactsBook3Line } from "react-icons/ri";
import { SiSkyrock } from "react-icons/si";
import { LuScrollText } from "react-icons/lu";
import { FaRegFileImage } from "react-icons/fa6";
import { MdSettings, MdMenu } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaGithubSquare, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
// Local Imports
import SkySharePage from "../Pages/SkyShare";
import TextsPage from "../Pages/ShareText";
import FilesPage from "../Pages/ShareFiles";
import FeedbackPage from "../Pages/Feedback";
import ContactPage from "../Pages/Contact";
import HowItWorksPage from "../Pages/HowItWorks";
import SignupLoginFormPage from "../Pages/SignupLogin";
import SettingsPage from "../Pages/AccountSettings";
import ThemeToggleComp from "./ThemeToggle";
import LanguageToggleBtnComp from "./LanguageToggleBtn";
import "../Config/i18Next";
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
    getItem(t("menu4"), "2", <GrWorkshop />),
    getItem(t("menu2"), "3", <LuScrollText />),
    getItem(t("menu3"), "4", <FaRegFileImage />),
    getItem(t("menu6"), "5", <VscFeedback />),
    getItem(t("menu7"), "6", <RiContactsBook3Line />),
    getItem(t("menu8"), "7", <BiSolidUserAccount />),
    getItem(t("menu9"), "8", <MdSettings />),
  ];

  const { user, isUser } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState([t("home"), items[0].label]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const breadcrumbItems = breadcrumb?.map((crumb, index) => ({
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
      setDrawerVisible(false);
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <SkySharePage />;
      case "3":
        return <TextsPage />;
      case "4":
        return <FilesPage />;
      case "2":
        return <HowItWorksPage />;
      case "5":
        return <FeedbackPage />;
      case "6":
        return <ContactPage />;
      case "7":
        return !isUser ? (
          <SignupLoginFormPage />
        ) : (
          <h1 className="text-4xl font-bold text-center dark:text-darkSecondary">
            {t("alreadyLogin")}
          </h1>
        );
      case "8":
        return isUser ? (
          <SettingsPage />
        ) : (
          <h1 className="text-4xl font-bold text-center dark:text-darkSecondary">
            {t("pleaseLogin")}
          </h1>
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
        classes="drawerButton top-3 left-2 p-0"
        btnType="button"
        btnIcon={<MdMenu className="w-6 h-6" />}
        clickOnUniversalBtn={() => setDrawerVisible(true)}
      />
      <Drawer
        title={t("menu")}
        placement="left"
        className="drawer"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          theme="dark"
          className="layoutMenu"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Drawer>
      <Layout className="dark:bg-darkPrimary ">
        <Content style={{ margin: "0 16px" }}>
          <div className="breadCrumbDiv flex justify-between items-center ">
            <Breadcrumb
              className="dark:text-darkSecondary"
              style={{ margin: "16px 0px" }}
              items={breadcrumbItems}
            />
            <div className="flex justify-center items-center gap-4 breadCrumbRight">
              <ThemeToggleComp />
              <LanguageToggleBtnComp />
              <Avatar className="bg-primary">
                {user !== null
                  ? user?.displayName?.slice(0, 1)?.toUpperCase()
                  : "U"}
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
        <Footer className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center sm:gap-0 ">
          <div className="flex justify-center items-center gap-4">
            <a href="https://github.com/muhammadfarooq85" target="_blank">
              <FaGithubSquare size={30} className="text-[#253552]" />
            </a>
            <a href="https://web.facebook.com/muhammadfarooq85" target="_blank">
              <FaFacebookSquare size={30} className="text-[#253552]" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammadfarooq85"
              target="_blank"
            >
              <FaLinkedin size={30} className="text-[#253552]" />
            </a>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-center dark:text-darkSecondary">
              Give a star on{" "}
              <a
                href="https://github.com/muhammadfarooq85/Sky-Share-App-Using-React-JS"
                target="_blank"
              >
                <span className="red">Github ⭐</span>
              </a>
            </h1>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
