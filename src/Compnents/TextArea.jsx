import { Input } from "antd";
const { TextArea } = Input;

function TextAreaComp({
  textAreaPlaceHolder,
  textValue,
  setTextValue,
}) {
  return (
    <div>
      <TextArea
        size="large"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        placeholder={textAreaPlaceHolder}
        className="textAreaShare text-4xl border border-none w-full overflow-hidden"
        autoSize
      />
    </div>
  );
}

export default TextAreaComp;
