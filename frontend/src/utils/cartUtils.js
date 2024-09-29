export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Function to get the tax rate by location
export const getTaxRateByLocation = (shippingAddress) => {
  const taxRates = {
    'AL': 4.00,
    'AK': 0.00,
    'AZ': 5.60,
    'AR': 6.50,
    'CA': 7.25,
    'CO': 2.90,
    // ... other states
    'WI': 5.00,
    'WY': 4.00,
    'DC': 6.00
  };
  // Default tax rate is 7% if the state is not found
  return taxRates[shippingAddress.state] || 0.07;
};

export const updateCart = (state) => {
  console.log(state);
  // Calculate the items price in whole number (pennies) to avoid issues with
  // floating point number calculations
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price * 100) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);


  // Calculate the shipping price based on delivery method
  const isHandDelivery = state.deliveryMethod === 'hand-delivered';
  const shippingPrice = isHandDelivery ? 0 : itemsPrice > 800 ? 0 : 100;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax rate based on the shipping address location
  const taxRate = getTaxRateByLocation(state.shippingAddress);
  
  // Calculate the tax price based on the tax rate
  const taxPrice = (taxRate / 100) * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  // Calculate the total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  console.log(totalPrice);
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};