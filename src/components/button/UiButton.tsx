import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./UiButton.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  disabled?: boolean;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export function UiButton(props: ButtonProps) {
  const {
    children,
    theme = "dark",
    disabled = false,
    onClick,
    ...otherProps
  } = props;

  return (
    <button
      className={`${classes.button} ${theme === 'light' ? classes.button_light : ''}`}
      disabled={disabled}
      type="button"
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
}
