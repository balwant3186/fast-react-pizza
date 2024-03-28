import React from "react";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

type MenuProps = {
  children?: React.ReactNode;
};

export interface Pizza {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}

const Menu: React.FC<MenuProps> = () => {
  const menu = useLoaderData() as Pizza[];

  return (
    <ul>
      {menu?.map((pizza: Pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
};

export default Menu;
