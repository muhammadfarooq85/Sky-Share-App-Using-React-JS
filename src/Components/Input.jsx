// Libraries Imports
import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function InputComp({
  inputValue,
  inputOnChange,
  inputPlaceHolder,
  inputAddonAfter,
  inputType,
  inputDisabled,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Input
      size="large"
      type={
        inputType === "password"
          ? passwordVisible
            ? "text"
            : "password"
          : inputType
      }
      value={inputValue}
      onChange={inputOnChange}
      placeholder={inputPlaceHolder}
      disabled={inputDisabled}
      addonAfter={
        inputType === "password" ? (
          <Button
            icon={
              passwordVisible ? (
                <EyeTwoTone className="dark:text-darkSecondary" />
              ) : (
                <EyeInvisibleOutlined className="dark:text-darkSecondary" />
              )
            }
            onClick={togglePasswordVisibility}
            type="text"
          />
        ) : (
          inputAddonAfter
        )
      }
      allowClear
    />
  );
}

InputComp.propTypes = {
  inputValue: PropTypes.string.isRequired,
  inputOnChange: PropTypes.func.isRequired,
  inputPlaceHolder: PropTypes.string.isRequired,
  inputAddonAfter: PropTypes.node,
  inputType: PropTypes.string.isRequired,
  inputDisabled: PropTypes.bool,
};

export default InputComp;
