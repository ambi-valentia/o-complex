import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Good, ShoppingItem } from "types/main";

export type itemIdx = number;

export interface CartSlice {
    cart: ShoppingItem[];
}

const initialState: CartSlice = {
    cart: [],
};

export const cartSlice = createSlice({
    name: 'cart', 
    initialState, 
    reducers: {
        setCart: (state, action: PayloadAction<ShoppingItem[]>) => {
            state.cart = action.payload;
        }, 
        addCartItem: (state, action: PayloadAction<Good>) => {
            const {asin, product_title, product_price} = action.payload;
            state.cart = [
                ...state.cart,
                {
                  id: asin,
                  name: product_title,
                  price: Number(product_price.replace("$", "")),
                  amount: 1,
                },
              ];
        },
        incrementCartItem: (state, action: PayloadAction<{itemIdx: number}>) => {
            const {itemIdx} = action.payload;
            state.cart[itemIdx].amount += 1;
        },
        setCartItem: (state, action: PayloadAction<{itemIdx: number, amount: number}>) => {
            const {itemIdx, amount} = action.payload;
            state.cart[itemIdx].amount = amount;
        },
        decrementCartItem: (state, action: PayloadAction<itemIdx>) => {
            state.cart[action.payload].amount -= 1;
            if (state.cart[action.payload].amount <= 0) {
                state.cart.splice(action.payload, 1);
            }
        },
        removeCartItem: (state, action: PayloadAction<itemIdx>) => {
            state.cart.splice(action.payload, 1);
        },
    }
});

export const { setCart, addCartItem, incrementCartItem, setCartItem, decrementCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;