import { getOrder } from "../../services/apiRestaurant";

type Loader = {
  params: {
    orderId: string;
  };
};

export const loader = async ({ params: { orderId } }: Loader) => {
  const order = await getOrder(orderId);
  console.log("🚀 ~ loader ~ order:", order);
  return order;
};
