import { FloatButton } from "antd";
import { MdShare } from "react-icons/md";

const FloatBtnComp = ({ clickOnFloatBtn }) => (
  <FloatButton onClick={clickOnFloatBtn} icon={<MdShare />} />
);

export default FloatBtnComp;
