import { UiAmountSelect, UiButton, UiCard, UiInput } from "components";
import InputMask from "react-input-mask";
import classes from "./Cart.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  setCart,
  setCartItem,
} from "store/reducers/cart.slice";
import { selectCart } from "store/selectors/cart.selector";
import { getStoredCart, storeCart } from "./lib/helper";

const storedNumber = localStorage.getItem("number");

const storePhoneNumber = (number: string) => {
  localStorage.setItem("number", number);
};

export function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const [number, setNumber] = useState<string>(storedNumber || "");
  const [numberError, setNumberError] = useState<boolean>(false);
  const storedCart = getStoredCart();

  useEffect(() => {
    if (storedCart?.length) {
      dispatch(setCart(storedCart));
    }
  }, []);

  useEffect(() => {
    storePhoneNumber(number);
  }, [number]);

  useEffect(() => {
    storeCart(cart);
  }, [cart]);

  useEffect(() => {
    if (number && numberError === true && number.indexOf("_") === -1) {
      setNumberError(false);
    }
  }, [numberError, number]);

  const onOrder = async function () {
    if (number.indexOf("_") !== -1 || !number) {
      setNumberError(true);
    } else if (!cart.length) {
      alert("Cart empty");
    } else {
      /* const cartRequest: CartItemRequest[] = cart.map((item) => ({
        id: item.id,
        quantity: item.amount,
      }));
      try {
        const response = await api.post<OrderResponse>(Routes.order, {
          phone: number.replace(/[_+\-() ]/g, ""),
          cart: cartRequest,
        });
        if (!response.success) {
          console.error(response.error);
          alert("Error while placing order");
        } else alert("Your order was placed successfully!");
      } catch (error) {
        console.error("Error while placing order:", error);
        alert("Error while placing order");
      } */
      setCart([]);
      localStorage.removeItem("cart");
      alert("Your order was placed successfully!");
    }
  };

  return (
    <div className={classes.cart}>
      <UiCard
        heading="Cart"
        bottomBar={[
          <InputMask
            mask="+7 (999) 999-99-99"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          >
            <UiInput
              error={numberError}
              placeholder="Enter your phone number"
            />
          </InputMask>,
          <div className={classes.buttons__wrapper}>
            <UiButton
              theme="flat"
              onClick={() => {
                dispatch(setCart([]));
              }}
            >
              Clear cart
            </UiButton>
            <UiButton onClick={onOrder}>Place order</UiButton>
          </div>,
        ]}
      >
        {!cart.length ? (
          <>No goods added</>
        ) : (
          <div className={classes.cartItems}>
            {cart.map((item, itemIdx) => (
              <div className={classes.cart__item}>
                <span className={classes.column__one}>{item.name}</span>
                <span>${item.price}</span>
                <span className={classes.amount__wrapper}>
                  <UiAmountSelect
                    onMinus={() => dispatch(decrementCartItem(itemIdx))}
                    onPlus={() => dispatch(incrementCartItem({ itemIdx }))}
                    value={item.amount}
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? dispatch(removeCartItem(itemIdx))
                        : dispatch(
                            setCartItem({
                              amount: Number(e.target.value),
                              itemIdx,
                            })
                          )
                    }
                  />
                </span>
                <span>
                  $
                  {Number.isInteger(item.price)
                    ? item.amount * item.price
                    : (item.amount * item.price).toFixed(2)}
                </span>
              </div>
            ))}
            <div className={classes.cart__item}>
              <span className={classes.column__one}>Total</span>
              <span className={classes.cartTotal}>
                $
                {(() => {
                  const total = cart.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.price * currentValue.amount,
                    0
                  );
                  return Number.isInteger(total) ? total : total.toFixed(2);
                })()}
              </span>
            </div>
          </div>
        )}
      </UiCard>
    </div>
  );
}
