import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems]=  useState({});

    const addToCart = (itemId) =>{
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev, [itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for (const item in cartItems){
            // if(cartItems[item]>0){
            //     let itemInfo=food_list.find((product)=>product._id === item);
            //     totalAmount += itemInfo.price * cartItems[item];
            // }
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => String(product._id) === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item with id ${item} not found in food_list`);
                }
            }
        }
        
        return totalAmount;
        
    }
    


    const contextValue = {
        food_list,
        cartItems,
        addToCart: (itemId) => setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 })),
        removeFromCart: (itemId) => setCartItems((prev) => {
        const newCount = (prev[itemId] || 0) - 1;
        if (newCount <= 0) {
            const { [itemId]: _, ...rest } = prev;
            return rest;
        }
        return { ...prev, [itemId]: newCount };
    }),
        setCartItems,
       
        getTotalCartAmount
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;