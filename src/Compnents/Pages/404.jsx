import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../Button";

function PageNotFound() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
      <ButtonComp title="Back to Home" clickOnUniversalBtn={toHome} />
    </div>
  );
}
export default PageNotFound;
