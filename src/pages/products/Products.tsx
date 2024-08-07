import { useEffect } from "react";
import classes from "./Products.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { UiCard, UiButton, UiAmountSelect } from "components";
import { Good, ShoppingItem } from "types/main";
// import api from "./services/api.service";
// import { Routes } from "./api";
import image from "/vite.svg";
import { getGoods } from "store/reducers/main.slice";
import {
  selectGoods,
  selectGoodsLoading,
  selectReviews,
  selectReviewsLoading,
} from "store/selectors/main.selector";
import { selectCart } from "store/selectors/cart.selector";
import {
  addCartItem,
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  setCart,
} from "store/reducers/cart.slice";
import { useNavigate } from "react-router-dom";
import { getStoredCart, storeCart } from "pages/cart/lib/helper";

const findCartItemIdx = (item: Good, cart: ShoppingItem[]) => {
  return cart.findIndex((cartItem) => cartItem.id === item.asin);
};

export function Products() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectReviews);
  const reviewsLoading = useAppSelector(selectReviewsLoading);
  const goods = useAppSelector(selectGoods);
  const goodsLoading = useAppSelector(selectGoodsLoading);
  const cart = useAppSelector(selectCart);
  const storedCart = getStoredCart();

  useEffect(() => {
    //dispatch(getReviews());
    dispatch(getGoods({ page: 1 }));
    if (storedCart?.length) {
      dispatch(setCart(storedCart));
    }
  }, []);

  useEffect(() => {
    storeCart(cart);
  }, [cart]);

  return (
    <>
      <UiButton theme="light" onClick={() => navigate("cart")}>
        Cart
      </UiButton>
      <div className={classes.reviews}>
        {Object.values(reviews).map((review) => (
          <div className={classes.review}>
            <UiCard heading="Review" key={review.id}>
              {reviewsLoading ? (
                <>LOADING...</>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: review.text }} />
              )}
            </UiCard>
          </div>
        ))}
      </div>
      <div className={classes.items}>
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
                            dispatch(incrementCartItem({ amount: 1, itemIdx }))
                          }
                          value={cart[itemIdx].amount}
                          onChange={(e) =>
                            e.target.value === "0"
                              ? dispatch(removeCartItem(itemIdx))
                              : dispatch(
                                  incrementCartItem({
                                    amount: Number(e.target.value),
                                    itemIdx,
                                  })
                                )
                          }
                        />,
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
                </UiCard>
              ))}
          </>
        )}
        {!goodsLoading && !goods?.length && <>No goods</>}
      </div>
    </>
  );
}
