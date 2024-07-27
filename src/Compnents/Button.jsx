import { Button } from "antd";

function ButtonComp({ title, clickOnUniversalBtn, classes, btnIcon }) {
  return (
    <Button
      className={`${classes} text-[#fff] font-medium tracking-wider text-xl pt-2 pb-2 pl-6 pr-6 rounded-lg bg-primary hover:duration-500 transition-all dark:bg-darkSecondary dark:text-darkPrimary`}
      onClick={clickOnUniversalBtn}
      icon={btnIcon}
      iconPosition="end"
    >
      {title}
    </Button>
  );
}

export default ButtonComp;
