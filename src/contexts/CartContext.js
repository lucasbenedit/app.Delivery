import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('@cart');
      const savedRestaurant = await AsyncStorage.getItem('@restaurant');
      
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedRestaurant) setRestaurant(JSON.parse(savedRestaurant));
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCart = async (items, rest) => {
    try {
      await AsyncStorage.setItem('@cart', JSON.stringify(items));
      if (rest) {
        await AsyncStorage.setItem('@restaurant', JSON.stringify(rest));
      }
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  };

  const addToCart = (item, restaurantInfo) => {
    if (restaurant && restaurant.id !== restaurantInfo.id) {
      alert('Você só pode pedir de um restaurante por vez. Finalize ou limpe o carrinho atual.');
      return false;
    }

    let newItems;
    if (!restaurant) {
      setRestaurant(restaurantInfo);
    }

    const existingItem = cartItems.find(i => i.id === item.id);
    
    if (existingItem) {
      newItems = cartItems.map(i =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      newItems = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(newItems);
    saveCart(newItems, restaurant || restaurantInfo);
    return true;
  };

  const removeFromCart = (itemId) => {
    const newItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(newItems);
    
    if (newItems.length === 0) {
      setRestaurant(null);
      saveCart([], null);
    } else {
      saveCart(newItems, restaurant);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      const newItems = cartItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCartItems(newItems);
      saveCart(newItems, restaurant);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurant(null);
    saveCart([], null);
  };

  const getTotal = () => {
    const itemsTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = restaurant?.deliveryFee || 0;
    return {
      items: itemsTotal,
      delivery: deliveryFee,
      total: itemsTotal + deliveryFee
    };
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      restaurant,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};