import { Outlet } from "react-router-dom";
import classes from "./Layout.module.scss";
import { Header } from "components";
import { useDispatch } from "react-redux";
import { setTheme } from "store/reducers/main.slice";
import { Theme } from "types/main";
import { useTheme } from "hooks/useTheme";

const theme = localStorage.getItem("theme");

export function Layout() {
  const dispatch = useDispatch();
  const storeTheme = useTheme();
  if (storeTheme === null) dispatch(setTheme(theme as Theme));

  return (
    <>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
}
