// Libraries Imports
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
// Local Imports
import "../Config/i18Next";

function DropDownComp({ selectedField, setSelectedField }) {
  const { t } = useTranslation();

  return (
    <Select
      showSearch
      size="large"
      className="w-full"
      value={selectedField || undefined}
      onChange={(value) => setSelectedField(value)}
      placeholder={t("selectField")}
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

DropDownComp.propTypes = {
  selectedField: PropTypes.string,
  setSelectedField: PropTypes.func,
};

export default DropDownComp;
