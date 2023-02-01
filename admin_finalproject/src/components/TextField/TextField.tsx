import React from "react";

type Props = {
  classWrapperStyle?: string;
  label?: string;
  inputType?: string;
  placeHolder?: string;
  formikName?: string;
  formikValue?: string | number;
  classStyle?: string;
  handleChange?: <Value>(field: Value | React.ChangeEvent<any | HTMLSelectElement>) => void;
  formikError?: string;
  defaultChecked?: boolean;
  onBlur?: <Value>(field: Value | React.ChangeEvent<any>) => void;
  disabled?: boolean
};

const TextField = ({
  handleChange,
  formikError,
  formikName,
  formikValue,
  classWrapperStyle,
  label,
  inputType,
  placeHolder,
  classStyle,
  disabled
}: Props) => {
  return (
    <div className={classWrapperStyle}>
      <label htmlFor="">{label}</label>
      {inputType === "date" ? (
        <input
          type="date"
          name={formikName}
          value={formikValue}
          className={classStyle}
          onChange={handleChange}
        />
      ) : inputType === "radio" ? (
        <input
          className={classStyle}
          type="radio"
          name={formikName}
          value={formikValue}
          onChange={handleChange}
          defaultChecked
        />
      ) : (
        <input
          type={inputType}
          placeholder={placeHolder}
          className={classStyle}
          name={formikName}
          value={formikValue}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
      {formikError && (
        <span style={{ color: "red" }} className="error">
          {formikError}
        </span>
      )}
    </div>
  );
};

export default TextField;
