import classes from "./UiSkeleton.module.scss";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  animation?: boolean;
}

export function UiSkeleton({
  width = "100%",
  height = "100%",
  borderRadius = "16px",
  animation = true,
}: SkeletonProps) {
  const styles = {
    width,
    height,
    borderRadius,
  };
  return <div className={`${classes.skeleton} ${animation ? classes.skeleton_animated : ''}`} style={styles}></div>;
}
