import { UiButton } from "components";
import Cart from "assets/cart.svg?react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <UiButton
        theme="clear"
        className={classes.cart}
        onClick={() => navigate("o-complex/cart")}
      >
        <Cart />
        <div>Cart</div>
      </UiButton>
    </header>
  );
}
