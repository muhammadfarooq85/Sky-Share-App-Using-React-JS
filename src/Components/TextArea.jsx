// Libraries Imports
import PropTypes from "prop-types";
import { Input } from "antd";
const { TextArea } = Input;

function TextAreaComp({ textAreaPlaceHolder, textValue, setTextValue }) {
  return (
    <TextArea
      size="large"
      value={textValue}
      onChange={(e) => setTextValue(e.target.value)}
      placeholder={textAreaPlaceHolder}
      className="textAreaShare dark:bg-darkSecondary dark:text-darkPrimary text-4xl border border-none w-full overflow-hidden"
      autoSize
      allowClear
    />
  );
}
TextAreaComp.propTypes = {
  textAreaPlaceHolder: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired,
  setTextValue: PropTypes.func.isRequired,
};

export default TextAreaComp;
