import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
}

// console.log(initialState);
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2) // 12.3456 to 12.35
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.id === item.id)
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.id === existItem.id ? item : x
                )
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );
        },
        setPrice: (state, action) => {
            const price = action.payload / 1000;
            console.log("State", price);
            state.couponPrice = addDecimals(price);
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            item.qty++;
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            if (item.qty === 1) {
                item.qty = 1
            } else {
                item.qty--;
            }
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            );
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.id !== action.payload)
            state.itemsPrice = addDecimals(
                state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
            )
        },
        resetCart: (state, action) => {
            state.cartItems = [];
            state.itemsPrice = 0;
            state.couponPrice = 0;
        },
    },
});


export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, resetCart, setPrice } = cartSlice.actions;

export default cartSlice.reducer;