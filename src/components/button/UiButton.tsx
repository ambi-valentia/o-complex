import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./UiButton.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark" | "flat" | "clear" | "clearDark";
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export function UiButton(props: ButtonProps) {
  const {
    children,
    theme = "light",
    disabled = false,
    className,
    onClick,
    ...otherProps
  } = props;

  return (
    <button
      className={`${classes.button} ${
        theme === "dark" ? classes.button_dark : ""
      } ${theme === "flat" ? classes.button_flat : ""} ${className || ""} ${
        theme === "clear" ? classes.button_clear : ""
      } ${theme === "clearDark" ? classes.button_clear_dark : ""}`}
      disabled={disabled}
      type="button"
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
}
