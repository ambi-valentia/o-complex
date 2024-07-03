import { ShoppingItem } from "types/main";

export const getStoredCart = () => JSON.parse(localStorage.getItem("cart") || "null");
export const storeCart = (cart: ShoppingItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };