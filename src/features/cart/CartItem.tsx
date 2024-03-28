import React from "react";
import { Cart } from "./Cart";
import { formatCurrency } from "../../utils/helpers";

type CartItemProps = {
  item: Cart;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
};
export default CartItem;
