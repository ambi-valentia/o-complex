import { Outlet } from "react-router-dom";
import classes from "./Layout.module.scss";
import { Header } from "components";

export function Layout() {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
}
