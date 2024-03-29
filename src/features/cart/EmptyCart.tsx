import React from "react";
import LinkButton from "../../ui/LinkButton";

type EmptyCartProps = {
  children?: React.ReactNode;
};

const EmptyCart: React.FC<EmptyCartProps> = () => {
  return (
    <div className="px-4 py-6">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
};
export default EmptyCart;
