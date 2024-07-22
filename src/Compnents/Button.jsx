import { Button } from "antd";

function ButtonComp({ title, clickOnUniversalBtn, classes, btnIcon }) {
  return (
    <Button
      className={`${classes} text-[#fff] font-medium tracking-wider text-xl pt-2 pb-2 pl-6 pr-6 rounded-lg bg-[#846ea7] hover:duration-500 transition-all`}
      onClick={clickOnUniversalBtn}
      icon={btnIcon}
      iconPosition="end"
    >
      {title}
    </Button>
  );
}

export default ButtonComp;
