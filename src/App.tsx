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

type addToCartProps = { amount: number } & (
  | { itemIdx: number }
  | { item: Good }
);

const maxAmount = 999999;
const storedCart = JSON.parse(localStorage.getItem("cart") || "null");
const storedNumber = localStorage.getItem("number");

const storePhoneNumber = (number: string) => {
  localStorage.setItem("number", number);
};

const storeCart = (cart: ShoppingItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const findCartItemIdx = (item: Good, cart: ShoppingItem[]) => {
  return cart.findIndex((cartItem) => cartItem.id === item.asin);
};

const removeCartItem = (index: number, cart: ShoppingItem[]) => {
  return cart.toSpliced(index, 1);
};

const decrementCartItem = (index: number, cart: ShoppingItem[]) => {
  let updatedCart = [...cart];

  updatedCart[index].amount -= 1;
  if (updatedCart[index].amount <= 0) {
    updatedCart = removeCartItem(index, cart);
  }
  return updatedCart;
};

const incrementCartItem = (
  index: number,
  cart: ShoppingItem[],
  amount: number
) => {
  const updatedCart = [...cart];
  if (amount === 1) updatedCart[index].amount += 1;
  else updatedCart[index].amount = amount;
  return updatedCart;
};

export function App() {
  const dispatch = useAppDispatch();
  const { reviews, reviewsLoading } = useAppSelector(
    (state) => state.mainReducer
  );
  const { goods, goodsLoading } = useAppSelector((state) => state.mainReducer);

  const [numberError, setNumberError] = useState<boolean>(false);
  const [cart, setCart] = useState<ShoppingItem[]>(storedCart || []);
  const [number, setNumber] = useState<string>(storedNumber || "");

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

  const onAddToCart = (props: addToCartProps) => {
    // increment amount of existing item
    if ("itemIdx" in props) {
      const updatedCart = incrementCartItem(props.itemIdx, cart, props.amount);
      setCart(updatedCart);
    } //add new item
    else if ("item" in props) {
      setCart([
        ...cart,
        {
          id: props.item.asin,
          name: props.item.product_title,
          price: Number(props.item?.product_price?.replace("$", "")),
          amount: props.amount,
        },
      ]);
    }
  };

  useEffect(() => {
    //dispatch(getReviews());
    dispatch(getGoods({ page: 1 }));
  }, []);

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
            <UiButton theme="flat" onClick={() => {setCart([])}}>Clear cart</UiButton>,
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
                  <span>
                    $
                    {Number.isInteger(item.price)
                      ? item.amount * item.price
                      : (item.amount * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className={classes.cartItem}>
                <span>Total</span>
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
                  key={item.asin}
                  theme="light"
                  bottomBar={(() => {
                    const itemIdx = findCartItemIdx(item, cart);
                    // if item is new to the cart
                    if (itemIdx === -1) {
                      return [
                        <UiButton
                          theme="dark"
                          onClick={() => onAddToCart({ amount: 1, item })}
                        >
                          Add to cart
                        </UiButton>,
                      ];
                    } // if item already exists in the cart
                    else
                      return [
                        <UiButton
                          theme="dark"
                          onClick={() =>
                            setCart(decrementCartItem(itemIdx, cart))
                          }
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
                          value={cart[itemIdx].amount}
                          onChange={(e) =>
                            e.target.value === "0"
                              ? setCart(removeCartItem(itemIdx, cart))
                              : onAddToCart({
                                  amount: Number(e.target.value),
                                  itemIdx,
                                })
                          }
                        />,
                        <UiButton
                          theme="dark"
                          onClick={() => onAddToCart({ amount: 1, itemIdx })}
                        >
                          +
                        </UiButton>,
                      ];
                  })()}
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
