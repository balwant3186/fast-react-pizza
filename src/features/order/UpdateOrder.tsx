import Button from "../../ui/Button";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

const UpdateOrder = () => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary" onClick={() => {}}>
        Make Priority
      </Button>
    </fetcher.Form>
  );
};
export default UpdateOrder;

export const action = async ({ request, params }) => {
  await updateOrder(params.orderId, { priority: true });
  return null;
};
