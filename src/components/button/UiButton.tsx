import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./UiButton.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark" | "flat";
  disabled?: boolean;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export function UiButton(props: ButtonProps) {
  const {
    children,
    theme = "light",
    disabled = false,
    onClick,
    ...otherProps
  } = props;

  return (
    <button
      className={`${classes.button} ${
        theme === "dark" ? classes.button_dark : ""
      } ${theme === "flat" ? classes.button_flat : ""}`}
      disabled={disabled}
      type="button"
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
}
