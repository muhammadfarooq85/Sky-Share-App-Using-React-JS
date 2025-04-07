// Libraries Imports
import PropTypes from "prop-types";
import { FloatButton, Popover } from "antd";
import { MdShare } from "react-icons/md";
// Local Imports
import SocialShareComp from "./SocialShare";

function FloatBtnComp({ clickOnFloatBtn }) {
  const shareUrl = "https://sky-share.vercel.app/";
  const shareTitle = "A free and easy tool for sharing files and text online!";
  const content = <SocialShareComp url={shareUrl} title={shareTitle} />;

  return (
    <Popover content={content} trigger="click" className="dark:bg-[#444444]">
      <FloatButton
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        onClick={clickOnFloatBtn}
        icon={<MdShare className="dark:text-darkSecondary" />}
      />
    </Popover>
  );
}

FloatBtnComp.propTypes = {
  clickOnFloatBtn: PropTypes.func,
};

export default FloatBtnComp;
