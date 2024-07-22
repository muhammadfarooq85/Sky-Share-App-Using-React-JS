import { Select } from "antd";

function DropDownComp() {
  return (
    <div>
      <Select
        showSearch
        size="large"
        className="w-full"
        placeholder="Select Field in which we are lacking"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: "User Interface (UI)",
            label: "User Interface (UI)",
          },
          {
            value: "User Experience (UX)",
            label: "User Experience (UX)",
          },
          {
            value: "Performance Issues",
            label: "Performance Issues",
          },
          {
            value: "Upload and Download Issues",
            label: "Upload and Download Issues",
          },
        ]}
      />
    </div>
  );
}

export default DropDownComp;
