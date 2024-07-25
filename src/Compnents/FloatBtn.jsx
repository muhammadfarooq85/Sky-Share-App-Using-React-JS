import { FloatButton, Popover } from "antd";
import { MdShare } from "react-icons/md";
import SocialShareComp from "./SocialShare";

function FloatBtnComp({ clickOnFloatBtn }) {
  const shareUrl = "https://yourwebsite.com";
  const shareTitle = "Check out this awesome website!";

  const content = <SocialShareComp url={shareUrl} title={shareTitle} />;

  return (
    <Popover content={content} trigger="click">
      <FloatButton
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        onClick={clickOnFloatBtn}
        icon={<MdShare />}
      />
    </Popover>
  );
}

export default FloatBtnComp;
