import { Select } from "antd";

function DropDownComp({ selectedField, setSelectedField }) {
  return (
    <Select
      showSearch
      size="large"
      className="w-full"
      value={selectedField || undefined}
      onChange={(value) => setSelectedField(value)}
      placeholder="Select field"
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
  );
}

export default DropDownComp;
