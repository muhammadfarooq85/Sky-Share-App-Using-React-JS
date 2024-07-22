import TextAreaComp from "../TextArea";

import ButtonComp from "../Button";

function TextsPage() {
  return (
    <div className="mainTexts flex flex-col justify-between items-end min-h-screen w-full">
      <div className="w-full">
        <TextAreaComp textAreaPlaceHolder="Type the text you want to share..." />
      </div>
      <div className="textsBtn flex justify-end items-center gap-2">
        <ButtonComp title="Clear" />
        <ButtonComp title="Save" />
      </div>
    </div>
  );
}

export default TextsPage;
