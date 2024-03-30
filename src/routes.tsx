import { createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import Error from "./ui/Error";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import { loader as menuLoader } from "./features/menu/MenuLoader";
import { loader as orderLoader } from "./features/order/OrderLoader";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        children: [
          {
            path: "new",
            element: <CreateOrder />,
            action: createOrderAction,
          },
          {
            path: ":orderId",
            element: <Order />,
            errorElement: <Error />,
            loader: orderLoader,
            action: updateOrderAction,
          },
        ],
      },
    ],
  },
]);
