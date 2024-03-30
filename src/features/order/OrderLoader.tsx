import { getOrder } from "../../services/apiRestaurant";

type Loader = {
  params: {
    orderId: string;
  };
};

export const loader = async ({ params: { orderId } }: Loader) => {
  const order = await getOrder(orderId);
  return order;
};
