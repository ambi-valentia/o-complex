import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import { useAppSelector } from "./hooks/redux";
// import { getGoods, getReviews } from "./store/reducers/main.slice";
import { UiInput, UiContainer, UiButton } from "./components";
import { Good, ShoppingItem } from "./types/main";
import InputMask from "react-input-mask";
// import api from "./services/api.service";
// import { Routes } from "./api";
import image from "/vite.svg";

const maxAmount = 999999;

export function App() {
  //  const dispatch = useAppDispatch();
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

  const localStorageCart = JSON.parse(localStorage.getItem("cart") || 'null');
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
      (cartItem) => cartItem.id === item.id
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
        { id: item.id, name: item.title, price: item.price, amount },
      ]);
    }
  };

  const onRemoveFromCart = (item: Good) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
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

  /* useEffect(() => {
    dispatch(getReviews());
    dispatch(getGoods({ page: 1, page_size: 50 }));
  }, [dispatch]); */

  const onOrder = async function () {
    if (number.indexOf("_") !== -1 || !number) {
      setNumberError(true);
    } else if (!cart.length) {
      alert("Корзина пуста");
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
          alert("Ошибка при размещении заказа");
        } else alert("Заказ успешно размещен!");
      } catch (error) {
        console.error("Error while placing order:", error);
        alert("Ошибка при размещении заказа");
      } */
      setCart([]);
      localStorage.removeItem('cart');
      alert("Заказ успешно размещен!");
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
          heading="Корзина"
          bottomBar={[
            <InputMask
              mask="+7 (999) 999-99-99"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            >
              <UiInput
                error={numberError}
                placeholder="Введите номер телефона"
              />
            </InputMask>,
            <UiButton onClick={onOrder}>Заказать</UiButton>,
          ]}
        >
          {!cart.length ? (
            <>Нет добавленных товаров</>
          ) : (
            <div className={classes.cartItems}>
              {cart.map((item) => (
                <div className={classes.cartItem}>
                  <span>{item.name}</span>
                  <span>x{item.amount}</span>
                  <span>{item.amount * item.price}</span>
                </div>
              ))}
              <div className={classes.cartItem}>
                <span>Итого</span>
                <span className={classes.cartTotal}>
                  {cart.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.price * currentValue.amount,
                    0
                  )}
                </span>
              </div>
            </div>
          )}
        </UiContainer>
      </div>
      <div className={classes.items}>
        {goodsLoading && <>GOODS LOADING...</>}
        {!goods?.length ? (
          <>No goods</>
        ) : (
          <>
            {goods &&
              goods.length &&
              goods.map((item) => (
                <UiContainer
                  bottomBar={
                    cart.find((cartItem) => cartItem.id === item.id) ===
                    undefined
                      ? [
                          <UiButton onClick={() => onAddToCart(item, 1)}>
                            Купить
                          </UiButton>,
                        ]
                      : [
                          <UiButton onClick={() => onRemoveFromCart(item)}>
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
                              cart.find((cartItem) => cartItem.id === item.id)
                                ?.amount
                            }
                            onChange={(e) =>
                              onAddToCart(item, Number(e.target.value))
                            }
                          />,
                          <UiButton onClick={() => onAddToCart(item, 1)}>
                            +
                          </UiButton>,
                        ]
                  }
                >
                  <div className={classes.product__info}>
                    <img src={image} width="281px" />
                    <span className={classes.product__heading}>
                      {item.title}
                    </span>
                    <span>{item.description}</span>
                    <span className={classes.product__heading}>
                      Цена: {item.price}
                    </span>
                  </div>
                </UiContainer>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
