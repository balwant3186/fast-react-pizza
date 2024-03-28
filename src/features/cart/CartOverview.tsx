import React from "react";
import { Link } from "react-router-dom";

type CartOverviewProps = {
  children?: React.ReactNode;
};

const CartOverview: React.FC<CartOverviewProps> = () => {
  return (
    <div>
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
};
export default CartOverview;
