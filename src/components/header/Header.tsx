import { UiButton } from "components";
import Light from "assets/light.svg?react";
import Dark from "assets/dark.svg?react";
import Cart from "assets/cart.svg?react";
import Vite from "assets/vite.svg?react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { setTheme } from "store/reducers/main.slice";
import { Theme } from "types/main";
import { useTheme } from "hooks/useTheme";
import { useEffect } from "react";
import { Paths } from "constants/routes";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className={classes.header}>
      <UiButton
        theme="clear"
        className={classes.cart}
        onClick={() => navigate(Paths.Products)}
      >
        <Vite />
        <div>Home</div>
      </UiButton>
      <div className={classes.buttons}>
        <UiButton
          theme="clear"
          className={classes.cart}
          onClick={() => {
            const appliedTheme: Theme = theme === "dark" ? "light" : "dark";
            dispatch(setTheme(appliedTheme));
            localStorage.setItem("theme", appliedTheme);
          }}
        >
          {theme === "dark" ? <Light /> : <Dark />}
          <div>Theme</div>
        </UiButton>
        <UiButton
          theme="clear"
          className={classes.cart}
          onClick={() => navigate(Paths.Cart)}
        >
          <Cart />
          <div>Cart</div>
        </UiButton>
      </div>
    </header>
  );
}
