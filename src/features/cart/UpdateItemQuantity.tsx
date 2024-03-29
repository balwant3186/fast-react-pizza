import React from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

type UpdateItemQuantityProps = {
  pizzaId: number;
  currentQuantity: number;
};

const UpdateItemQuantity: React.FC<UpdateItemQuantityProps> = ({
  pizzaId,
  currentQuantity,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseQuantity(pizzaId))}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
};
export default UpdateItemQuantity;
