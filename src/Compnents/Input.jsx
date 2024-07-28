import React, { useState } from "react";
import { Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function InputComp({
  inputValue,
  inputOnChange,
  inputPlaceHolder,
  inputAddonAfter,
  inputType,
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

export default InputComp;
