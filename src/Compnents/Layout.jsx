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

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Sky Share", "1", <SiSkyrock />),
  getItem("Share Text", "2", <LuScrollText />),
  getItem("Share Files", "3", <FaRegFileImage />),
  getItem("How it Works", "4", <GrWorkshop />),
  getItem("Download", "5", <VscDesktopDownload />),
  getItem("Feedback", "6", <VscFeedback />),
  getItem("Contact Us", "7", <RiContactsBook3Line />),
];

const LayoutComp = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState(["Home", items[0].label]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    const selectedItem = items.find((item) => item.key === key);
    setBreadcrumb(["Home", selectedItem.label]);
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
        breakpoint="sm"
        onCollapse={(value) => setCollapsed(value)}
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
      <Layout>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {breadcrumb.map((crumb, index) => (
              <Breadcrumb.Item key={index}>{crumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 620,
              background: colorBgContainer,
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
          <span className="font-light ">
            This product is created by M. Farooq.
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
