// Cart utility functions to ensure consistent handling of cart data

// Get cart from localStorage
export const getCart = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
      return JSON.parse(savedCart);
    }
    return [];
  } catch (error) {
    console.error('Error getting cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
export const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
};

// Add item to cart
export const addItemToCart = (item) => {
  try {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      // If item exists, increase quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Otherwise add new item
      cart.push({
        id: item.id,
        title: item.title,
        author: item.author,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }
    
    saveCart(cart);
    return cart;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return getCart(); // Return current cart as fallback
  }
};

// Remove item from cart
export const removeItemFromCart = (itemId) => {
  try {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    saveCart(updatedCart);
    return updatedCart;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return getCart(); // Return current cart as fallback
  }
};

// Update item quantity
export const updateItemQuantity = (itemId, change) => {
  try {
    const cart = getCart();
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
      }
      return item;
    });
    
    saveCart(updatedCart);
    return updatedCart;
  } catch (error) {
    console.error('Error updating item quantity:', error);
    return getCart(); // Return current cart as fallback
  }
};

// Clear cart
export const clearCart = () => {
  try {
    localStorage.removeItem('cart');
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    return getCart(); // Return current cart as fallback
  }
}; 