const { TextArea } = Input;
import { Input } from "antd";

function TextAreaComp({ textAreaPlaceHolder, textValue, setTextValue }) {
  return (
    <div>
      <TextArea
        size="large"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        placeholder={textAreaPlaceHolder}
        className="textAreaShare dark:bg-darkPrimary dark:text-darkSecondary text-4xl border border-none w-full overflow-hidden"
        autoSize
        allowClear
      />
    </div>
  );
}

export default TextAreaComp;
