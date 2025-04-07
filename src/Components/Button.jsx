// Libraries Imports
import { Button } from "antd";
import PropTypes from "prop-types";

function ButtonComp({ title, clickOnUniversalBtn, classes, btnIcon, btnType }) {
  return (
    <Button
      className={`${classes} allButton border-none text-[#fff] font-medium tracking-wider text-xl pt-6 pb-6 pl-8 pr-8 rounded-lg `}
      onClick={clickOnUniversalBtn}
      icon={btnIcon}
      iconPosition="end"
      type={btnType}
    >
      {title}
    </Button>
  );
}

ButtonComp.propTypes = {
  title: PropTypes.string,
  clickOnUniversalBtn: PropTypes.func,
  classes: PropTypes.string,
  btnIcon: PropTypes.node,
  btnType: PropTypes.string.isRequired,
};

export default ButtonComp;
