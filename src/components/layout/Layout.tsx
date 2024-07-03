import { Outlet } from "react-router-dom";
import classes from "./Layout.module.scss";

export function Layout() {
  return (
    <main className={classes.main}>
      <Outlet />
    </main>
  );
}
