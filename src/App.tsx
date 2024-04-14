import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getGoods, getReviews } from "./store/reducers/main.slice";
import { UiInput, UiContainer, UiButton } from "./components";
import {
  CartItemRequest,
  Good,
  OrderResponse,
  ShoppingItem,
} from "./types/main";
import InputMask from "react-input-mask";
import api from "./services/api.service";
import { Routes } from "./api";

export function App() {
  const dispatch = useAppDispatch();
  const { reviews, reviewsLoading } = useAppSelector(
    (state) => state.mainReducer
  );
  const { goods, goodsLoading } = useAppSelector((state) => state.mainReducer);

  const [numberError, setNumberError] = useState<boolean>(false);
  const [cart, setCart] = useState<ShoppingItem[]>([]);
  const [number, setNumber] = useState<string>("");

  const savePhoneNumber = (number: string) => {
    localStorage.setItem("number", number);
  };

  const getPhoneNumber = () => {
    return localStorage.getItem("number");
  };

  const saveCart = (cart: ShoppingItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

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

  useEffect(() => {
    const savedNumber = getPhoneNumber();
    const savedCart = getCart();

    if (savedNumber) {
      setNumber(savedNumber);
    }
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const onAddToCart = (item: Good) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        { id: item.id, name: item.title, price: item.price, amount: 1 },
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

      if (updatedCart[existingItemIndex].amount === 0) {
        updatedCart.splice(existingItemIndex, 1);
      }

      setCart(updatedCart);
    }
  };

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getGoods({ page: 1, page_size: 50 }));
  }, [dispatch]);

  const onOrder = async function () {
    if (number.indexOf("_") !== -1 || !number) {
      setNumberError(true);
    } else if (!cart.length) {
      alert("Корзина пуста");
    } else {
      const cartRequest: CartItemRequest[] = cart.map((item) => ({
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
      }
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
            <>
              {cart.map((item) => (
                <div className={classes.items}>
                  <span>{item.name}</span>
                  <span>x{item.amount}</span>
                  <span>{item.amount * item.price}</span>
                </div>
              ))}
            </>
          )}
        </UiContainer>
      </div>
      <div className={classes.items}>
        {goodsLoading && <>GOODS LOADING...</>}
        {!goods.length ? (
          <>No goods</>
        ) : (
          <>
            {goods &&
              goods.length &&
              goods.map((item) => (
                <UiContainer
                  bottomBar={
                    cart.find((cartItem) => cartItem.name === item.title) ===
                    undefined
                      ? [
                          <UiButton onClick={() => onAddToCart(item)}>
                            Купить
                          </UiButton>,
                        ]
                      : [
                          <UiButton onClick={() => onRemoveFromCart(item)}>
                            -
                          </UiButton>,
                          <UiButton disabled>
                            {
                              cart.find(
                                (cartItem) => cartItem.name === item.title
                              )?.amount
                            }
                          </UiButton>,
                          <UiButton onClick={() => onAddToCart(item)}>
                            +
                          </UiButton>,
                        ]
                  }
                >
                  <div className={classes.product__info}>
                    <img src={item.image_url} width="281px" />
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
