import React, { SyntheticEvent, useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressThunk, getUserData } from "../user/userSlice";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

type CreateOrderProps = {
  children?: React.ReactNode;
};

const CreateOrder: React.FC<CreateOrderProps> = () => {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(1);

  const totalCartPrice = useSelector(getTotalPrice);

  const cart = useSelector(getCart);
  const {
    address,
    status,
    position: { latitude, longitude },
    username,
    error: errorAddress,
  } = useSelector(getUserData);

  const navigation = useNavigation();

  const formErrors = useActionData() as { [key: string]: string };

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  const isSubmitting = navigation.state === "submitting";

  const isLoadingAddress = status === "loading";

  const handleGetPosition = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchAddressThunk());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {status === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!latitude && !longitude && (
            <span className="absolute right-1 top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={handleGetPosition}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked ? 1 : 0)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={latitude && longitude ? `${latitude}, ${longitude}` : ""}
        />

        <div>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order"
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());

  const order = {
    ...formData,
    cart: JSON.parse(formData.cart),
    priority: !!formData.priority,
  };

  const errors: { [key: string]: string } = {};

  if (!isValidPhone(formData.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
