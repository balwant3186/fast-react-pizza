import React from "react";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";

type DeleteItemProps = {
  pizzaId: number;
};

const DeleteItem: React.FC<DeleteItemProps> = ({ pizzaId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteItem(pizzaId));
  };

  return (
    <Button type="small" onClick={handleDelete}>
      Delete
    </Button>
  );
};
export default DeleteItem;
