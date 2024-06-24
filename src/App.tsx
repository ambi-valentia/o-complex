import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { UiInput, UiContainer, UiButton } from "./components";
import { Good, ShoppingItem } from "./types/main";
import InputMask from "react-input-mask";
// import api from "./services/api.service";
// import { Routes } from "./api";
import image from "/vite.svg";
import { getGoods } from "./store/reducers/main.slice";

const maxAmount = 999999;

export function App() {
  const dispatch = useAppDispatch();
  const { reviews, reviewsLoading } = useAppSelector(
    (state) => state.mainReducer
  );
  const { goods, goodsLoading } = useAppSelector((state) => state.mainReducer);

  const [numberError, setNumberError] = useState<boolean>(false);

  const savePhoneNumber = (number: string) => {
    localStorage.setItem("number", number);
  };

  const saveCart = (cart: ShoppingItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const localStorageCart = JSON.parse(localStorage.getItem("cart") || "null");
  const localStorageNumber = localStorage.getItem("number");
  const [cart, setCart] = useState<ShoppingItem[]>(localStorageCart || []);
  const [number, setNumber] = useState<string>(localStorageNumber || "");

  useEffect(() => {
    savePhoneNumber(number);
  }, [number]);

  useEffect(() => {
    if (number && numberError === true && number.indexOf("_") === -1) {
      setNumberError(false);
    }
  }, [numberError, number]);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const onAddToCart = (item: Good, amount: number) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.asin
    );

    if (amount === 0) {
      const updatedCart = [...cart].splice(existingItemIndex, 1);
      setCart(updatedCart);
    }

    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return {
            ...cartItem,
            amount: amount === 1 ? cartItem.amount + 1 : amount,
          };
        }
        return cartItem;
      });

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          id: item.asin,
          name: item.product_title,
          price: Number(item?.product_price?.replace("$", "")),
          amount,
        },
      ]);
    }
  };

  const onRemoveFromCart = (item: Good) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.asin
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];

      updatedCart[existingItemIndex].amount--;

      if (updatedCart[existingItemIndex].amount <= 0) {
        updatedCart.splice(existingItemIndex, 1);
      }

      setCart(updatedCart);
    }
  };

  useEffect(() => {
    //dispatch(getReviews());
    dispatch(getGoods({ page: 1 }));
  }, [dispatch]);

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
    <div className={classes.main}>
      <div className={classes.reviews}>
        {Object.values(reviews).map((review) => (
          <div className={classes.review}>
            <UiContainer heading="Review" key={review.id}>
              {reviewsLoading ? (
                <>LOADING...</>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: review.text }} />
              )}
            </UiContainer>
          </div>
        ))}
      </div>
      <div className={classes.cart}>
        <UiContainer
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
            <UiButton onClick={onOrder}>Place order</UiButton>,
          ]}
        >
          {!cart.length ? (
            <>No goods added</>
          ) : (
            <div className={classes.cartItems}>
              {cart.map((item) => (
                <div className={classes.cartItem}>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <span>x{item.amount}</span>
                  <span>${(item.amount * item.price).toFixed(2)}</span>
                </div>
              ))}
              <div className={classes.cartItem}>
                <span>Total</span>
                <span className={classes.cartTotal}>
                  $
                  {cart
                    .reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.price * currentValue.amount,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </UiContainer>
      </div>
      <div className={classes.items}>
        {goodsLoading ? (
          <>GOODS LOADING...</>
        ) : (
          <>
            {goods &&
              goods.length &&
              goods.map((item) => (
                <UiContainer
                  theme="light"
                  bottomBar={
                    cart.find((cartItem) => cartItem.id === item.asin) ===
                    undefined
                      ? [
                          <UiButton
                            theme="light"
                            onClick={() => onAddToCart(item, 1)}
                          >
                            Add to cart
                          </UiButton>,
                        ]
                      : [
                          <UiButton
                            theme="light"
                            onClick={() => onRemoveFromCart(item)}
                          >
                            -
                          </UiButton>,
                          <UiInput
                            type="number"
                            min={1}
                            max={maxAmount}
                            onKeyDown={(e) =>
                              ["E", "e", "-", "+"].includes(e.key) &&
                              e.preventDefault()
                            }
                            value={
                              cart.find((cartItem) => cartItem.id === item.asin)
                                ?.amount
                            }
                            onChange={(e) =>
                              onAddToCart(item, Number(e.target.value))
                            }
                          />,
                          <UiButton
                            theme="light"
                            onClick={() => onAddToCart(item, 1)}
                          >
                            +
                          </UiButton>,
                        ]
                  }
                >
                  <div className={classes.product__info}>
                    <div className={classes.product}>
                      <img
                        src={item.product_photo || image}
                        width="281px"
                        style={{ maxWidth: "281px", maxHeight: "500px" }}
                      />
                      <span className={classes.product__heading}>
                        {item.product_title}
                      </span>
                    </div>
                    <span className={classes.product__heading}>
                      Price: {item.product_price}
                    </span>
                  </div>
                </UiContainer>
              ))}
          </>
        )}
        {!goodsLoading && !goods?.length && <>No goods</>}
      </div>
    </div>
  );
}
