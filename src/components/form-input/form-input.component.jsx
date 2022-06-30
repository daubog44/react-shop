import { Group } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <input className="form-input" {...otherProps} />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "form-input-label__shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </Group>
  );
};

export default FormInput;
