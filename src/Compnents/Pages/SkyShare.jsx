import { ReactTyped } from "react-typed";
import { SiSkyrock } from "react-icons/si";
import ButtonComp from "../Button";
import { MdOutlineRestartAlt } from "react-icons/md";
import FloatBtnComp from "../FloatBtn";

function SkySharePage() {
  return (
    <div className="mainWelcome">
      <div className="welocmeCnt flex flex-col justify-center items-center gap-3 min-h-screen">
        <SiSkyrock className="text-[#846ea7] w-24 h-24" />
        <h2 className="text-3xl font-medium text-center">Hy! Everyone👋</h2>
        <h2 className="text-4xl font-medium text-center">
          Welcome to Sky Share
        </h2>
        <ReactTyped
          className="text-4xl font-bold text-center"
          strings={["What will you explore here?"]}
        />
        <ReactTyped
          className="text-5xl typingEffectInput"
          strings={[
            "Explore Texts",
            "Explore Files",
            "Explore Download",
            "Explore Working",
            "Explore Feedback",
            "Explore Contact",
          ]}
          typeSpeed={60}
          backSpeed={60}
          attr="placeholder"
          loop
        >
          <input type="text" className=" bg-[#fff] text-center" disabled />
        </ReactTyped>

        <p className="text-2xl text-center">
          Let's start a quick tour of Sky share and we will have <br /> you up
          and runing in no time.
        </p>
        <div className="tourBtn">
          <ButtonComp
            title="Let's Explore"
            btnIcon={<MdOutlineRestartAlt size={25} />}
          />
        </div>
        <FloatBtnComp />
      </div>
    </div>
  );
}

export default SkySharePage;
