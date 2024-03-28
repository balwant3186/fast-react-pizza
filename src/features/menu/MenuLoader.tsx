import { getMenu } from "../../services/apiRestaurant";

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};
