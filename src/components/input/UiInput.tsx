import {
  InputHTMLAttributes,
} from "react";
import classes from "./UiInput.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}
export function UiInput(props: InputProps) {
  const { disabled, placeholder, required = false, error = false, ...otherProps } = props;

  return (
    <div className={classes.wrapper}>
      <input
        className={`${classes.input} ${error ? classes.error : ''}`}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        {...otherProps}
      />
    </div>
  );
}
