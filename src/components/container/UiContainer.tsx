import classes from "./UiContainer.module.scss";

interface UiContainerProps {
  disabled?: boolean;
  heading?: string;
  children?: JSX.Element;
  bottomBar?: JSX.Element[];
}

export function UiContainer({
  disabled = false,
  children,
  heading,
  bottomBar,
}: UiContainerProps) {
  return (
    <div className={`${classes.container} ${disabled ? classes.disabled : ""}`}>
      <span className={classes.heading}>
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
