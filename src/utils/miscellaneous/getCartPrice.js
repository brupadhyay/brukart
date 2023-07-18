const getCartPrice = (cart, coupon) => {
  
  const totalItems = cart.reduce((acc, curr) => (acc += curr.qty), 0);

  const totalPrice = cart.reduce((acc, curr) => (acc += Number(curr.price) * Number(curr.qty)), 0)
    .toFixed(2);

  const totalDiscount = (
    cart.reduce(
      (acc, curr) =>
        (acc += curr.discount
          ? Number(curr.qty) *
            (Number(curr.price) * (Number(curr.discount) / 100))
          : 0),
      0
    )
  ).toFixed(2);

  const deliveryCharges = 7;

  const totalAmount = (totalPrice - totalDiscount + deliveryCharges).toFixed(2);

  return {
    totalPrice,
    totalDiscount,
    deliveryCharges,
    totalAmount,
    totalItems,
  };
};

export { getCartPrice };
