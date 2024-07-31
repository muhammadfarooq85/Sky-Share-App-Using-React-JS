import { Button } from "antd";

function ButtonComp({ title, clickOnUniversalBtn, classes, btnIcon }) {
  return (
    <Button
      className={`${classes} allBuutton  text-[#fff] font-medium tracking-wider text-xl pt-6 pb-6 pl-8 pr-8 rounded-lg bg-primary  dark:bg-darkSecondary dark:text-darkPrimary`}
      onClick={clickOnUniversalBtn}
      icon={btnIcon}
      iconPosition="end"
    >
      {title}
    </Button>
  );
}

export default ButtonComp;
