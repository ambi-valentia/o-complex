import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getReviews } from "./store/reducers/main.slice";
import { UiInput, UiContainer, UiButton } from "./components";
import { Good, ShoppingItem } from "./types/main";
import InputMask from "react-input-mask";

export function App() {
  const dispatch = useAppDispatch();
  const { reviews, isLoading } = useAppSelector((state) => state.mainReducer);

  const [cart, setCart] = useState<ShoppingItem[]>([
    { name: "name", amount: 3, price: 10000 },
    { name: "name", amount: 3, price: 10000 },
    { name: "name", amount: 3, price: 10000 },
    { name: "name", amount: 3, price: 10000 },
  ]);
  const [goods, setGoods] = useState<Good[]>([
    {
      title: "name",
      description: "texttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 10000,
    },
    {
      title: "name",
      description: "texttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 10000,
    },
    {
      title: "name",
      description: "texttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 10000,
    },
    {
      title: "name",
      description: "texttexttexttexttexttexttexttexttexttexttexttexttext",
      price: 10000,
    },
  ]);
  const [number, setNumber] = useState<string>("");
  /* const reviews = [
    { id: "id", text: "texttexttexttexttexttexttexttexttexttexttexttexttext" },
    { id: "id", text: "texttexttexttexttexttexttexttexttexttexttexttexttext" },
    { id: "id", text: "texttexttexttexttexttexttexttexttexttexttexttexttext" },
    { id: "id", text: "texttexttexttexttexttexttexttexttexttexttexttexttext" },
    { id: "id", text: "texttexttexttexttexttexttexttexttexttexttexttexttext" },
    { id: "id", text: "texttexttexttexttexttexttexttexttexttexttexttexttext" },
    {id: 'id', text: 'texttexttexttexttexttexttexttexttexttexttexttexttext'}
  ]; */

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <div className={classes.main}>
      <div className={classes.reviews}>
        {Object.values(reviews).map((review) => (
          <div className={classes.review}>
            <UiContainer heading="Review" key={review.id}>
              {isLoading ? (
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
              <UiInput placeholder="Введите номер телефона" />
            </InputMask>,
            <UiButton>Заказать</UiButton>,
          ]}
        >
          {!cart.length ? (
            <>Нет добавленных товаров</>
          ) : (
            <>
              {cart.map((item) => (
                <div className={classes.items}>
                  <span>{item.name}</span>
                  <span>{item.amount}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </>
          )}
        </UiContainer>
      </div>
      <div className={classes.items}>
        {!goods.length ? (
          <></>
        ) : (
          <>
            {goods.map((item) => (
              <UiContainer>
                <>
                  <span>{item.title}</span>
                  <span>{item.description}</span>
                  <span>{item.price}</span>
                </>
              </UiContainer>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
