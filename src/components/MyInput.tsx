// @ts-nocheck
import * as styles from "../css/components/AgeInput.css";
const MyInput = ({
  type = "text",
  name,
  value,
  onChange,
  onKeyDown,
  placeholder,
  onBlur,
  className,
}: any) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={className ?? styles.myinput}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      placeholder={placeholder}
    />
  );
};

export default MyInput;
