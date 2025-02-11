import React,  { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URI;
    const currency = '₹';
    const delivery_fee = 10;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const  navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("")

    const addToCart = async(itemId,size) => {
      
        let cartData = structuredClone(cartItems);

        if(!size){
            toast.error('Select Product Size');
            return
        }
       
        if(cartData[itemId]){
            
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
                
            }else{
                cartData[itemId][size] = 1;
            }
            
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if(token){
            try{
                await axios.post(backendUrl+'/cart/add', {itemId, size}, {headers:{token}});

            }catch(error){
                console.log(error);
                toast.error(error.message)
            }
        }

    }

    const getCartCount =() => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                if(cartItems[items][item]>0){
                totalCount += cartItems[items][item]
                }
            }
        }

        return totalCount;

    }

    const getCartAmount =() => {
        let totalAmmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            
            for(const item in cartItems[items]){
                
                try{
                    
                    if(cartItems[items][item] > 0){
                        totalAmmount += itemInfo.price*cartItems[items][item]
                    }

                }catch(error){
                    
                }
            }
        }
        return totalAmmount;
    }

    const updateQuantity = async(itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        
        setCartItems(cartData);

        if(token){
            try{
                await axios.post(backendUrl+'/cart/update', {itemId, size, quantity}, {headers:{token}});

            }catch(error){
                console.log(error);
                toast.error(error.message)
            }
        }

    };

    const getCart = async(token) => {
        if(token){
          try{
            const response =  await axios.post(backendUrl+'/cart/get',{}, {headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData)
            }else{
                toast.error(response.data.message)
            }
          }catch(error){
              console.log(error);
              toast.error(error.message)
          }
      }
      }

    const getProducts = async() => {
       try{
            const response = await axios.get(backendUrl+'/product/list');
            if(response.data.success){           
            setProducts(response.data.products)

            }else{
                toast.error(response.data.message)
            }

       }catch(error){
            toast.error(error.message)
       }
       
    }

    
    const value = {
        products, currency, delivery_fee,search, setSearch,showSearch, setShowSearch,
        cartItems,setCartItems, addToCart, updateQuantity,getCartCount,getCartAmount,navigate, token, setToken, backendUrl
    }

   useEffect(()=>{
        getProducts();
   },[])

   useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
        getCart(localStorage.getItem('token'));

    }
},[token])

    return(
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

