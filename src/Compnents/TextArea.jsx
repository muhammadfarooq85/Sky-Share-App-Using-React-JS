import { Input } from "antd";
const { TextArea } = Input;

function TextAreaComp({ textAreaPlaceHolder }) {
  return (
    <div>
      <TextArea
        size="large"
        placeholder={textAreaPlaceHolder}
        className="textAreaShare text-4xl border border-none w-full overflow-hidden"
        autoSize
      />
    </div>
  );
}

export default TextAreaComp;
