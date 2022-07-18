import { InputHTMLAttributes, FC } from "react";
import { Group } from "./form-input.styles";

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <input className="form-input" {...otherProps} />
      {label ? (
        <label
          className={`${
            Boolean(
              otherProps.value &&
                typeof otherProps.value === "string" &&
                otherProps.value.length
            )
              ? "form-input-label__shrink"
              : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </Group>
  );
};

export default FormInput;
