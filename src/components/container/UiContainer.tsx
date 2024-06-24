import classes from "./UiContainer.module.scss";

interface UiContainerProps {
  theme?: "light" | "dark";
  disabled?: boolean;
  heading?: string;
  children?: JSX.Element;
  bottomBar?: JSX.Element[];
}

export function UiContainer({
  disabled = false,
  theme = "dark",
  children,
  heading,
  bottomBar,
}: UiContainerProps) {
  return (
    <div
      className={`${classes.container} ${
        theme === "light" ? classes.container_light : ""
      } ${disabled ? classes.disabled : ""}`}
    >
      <span className={`${classes.heading} ${
        theme === "light" ? classes.heading_light : ""
      }`}>
        <h1>{heading}</h1>
      </span>
      <div className={classes.content}>{children}</div>
      <span className={classes.bar}>
        {bottomBar?.map((element) => (
          <>{element}</>
        ))}
      </span>
    </div>
  );
}
