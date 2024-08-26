import { useEffect, useState } from "react";
import classes from "./Products.module.scss";
import { UiCard, UiButton, UiAmountSelect } from "components";
import { Good, ShoppingItem } from "types/main";
import image from "/vite.svg";
import { selectGoods, selectGoodsLoading } from "store/selectors/main.selector";
import { selectCart } from "store/selectors/cart.selector";
import {
  addCartItem,
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  setCart,
  setCartItem,
} from "store/reducers/cart.slice";
import { getStoredCart, storeCart } from "pages/cart/lib/helper";
import { useDispatch, useSelector } from "react-redux";
import { Paths } from "constants/routes";
import { useNavigate } from "react-router-dom";
import LessItems from "assets/less_items.svg?react";
import MoreItems from "assets/more_items.svg?react";
import { getGoods } from "store/reducers/main.slice";

const findCartItemIdx = (item: Good, cart: ShoppingItem[]) => {
  return cart.findIndex((cartItem) => cartItem.id === item.asin);
};

export function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goods = useSelector(selectGoods);
  const goodsLoading = useSelector(selectGoodsLoading);
  const cart = useSelector(selectCart);
  const storedCart = getStoredCart();
  const [moreItems, setMore] = useState(true);

  useEffect(() => {
    dispatch(getGoods({ page: 1 }));
    if (storedCart?.length) {
      dispatch(setCart(storedCart));
    }
  }, []);

  useEffect(() => {
    storeCart(cart);
  }, [cart]);

  return (
    <div className={classes.products__container}>
      <div className={classes.icons}>
        <UiButton theme="clear" onClick={() => setMore(false)}>
          <LessItems />
        </UiButton>
        <UiButton theme="clear" onClick={() => setMore(true)}>
          <MoreItems />
        </UiButton>
      </div>
      <div className={`${classes.items} ${moreItems ? classes.items_more : ''}`}>
        {goodsLoading ? (
          <>GOODS LOADING...</>
        ) : (
          <>
            {goods &&
              goods.length &&
              goods.map((item) => (
                <UiCard
                  key={item.asin}
                  theme="light"
                  bottomBar={(() => {
                    const itemIdx = findCartItemIdx(item, cart);
                    // if item is new to the cart
                    if (itemIdx === -1) {
                      return [
                        <UiButton
                          theme="dark"
                          onClick={() => dispatch(addCartItem(item))}
                        >
                          Add to cart
                        </UiButton>,
                      ];
                    } // if item already exists in the cart
                    else
                      return [
                        <UiAmountSelect
                          onMinus={() => dispatch(decrementCartItem(itemIdx))}
                          onPlus={() =>
                            dispatch(incrementCartItem({ itemIdx }))
                          }
                          value={cart[itemIdx].amount}
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
                        />,
                      ];
                  })()}
                >
                  <div
                    className={classes.product__info}
                    onClick={() =>
                      navigate(`/${Paths.Products}/reviews/${item?.asin}`)
                    }
                  >
                    <div className={classes.product}>
                      <img
                        src={item.product_photo || image}
                        className={`${moreItems ? classes.product__image_small : classes.product__image}`}
                      />
                      <span className={classes.product__price}>
                        {item.product_price}
                      </span>
                      <span className={classes.product_name}>
                        {item.product_title}
                      </span>
                    </div>
                  </div>
                </UiCard>
              ))}
          </>
        )}
        {!goodsLoading && !goods?.length && <>No goods</>}
      </div>
    </div>
  );
}
