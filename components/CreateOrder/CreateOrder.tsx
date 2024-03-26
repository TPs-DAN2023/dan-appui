import { Button, FormInput } from "@/components";
import { IOrder } from "@/interfaces";
import { API_URLS, apiCall } from "@/services";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

interface CreateOrderProps {
  show: boolean;
  onCancel: () => void;
  selectedStockAndProductArray: { product: IProduct; selectedStock: number }[];
}

const incompleteOrder = {
  numeroPedido: "",
  total: 0,
  observaciones: "",
};

export default function CreateOrder({
  selectedStockAndProductArray,
  show,
  onCancel,
}: CreateOrderProps) {
  incompleteOrder.total = selectedStockAndProductArray.reduce(
    (accumulator, { product, selectedStock }) =>
      accumulator + product.precio * selectedStock,
    0
  );

  const [order, setOrder] = useState<IOrder>(incompleteOrder);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const router = useRouter();

  const removeItemsFromCart = () => {
    localStorage.removeItem("cart");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsCreatingOrder(true);
    try {
      const data = await apiCall(`${API_URLS.orders}`, "POST", order);
      console.log("Pedido creado!", data);
      removeItemsFromCart();
      router.push(ROUTES.ORDERS);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleCancel = (event: React.FormEvent) => {
    event.preventDefault();
    setOrder(incompleteOrder);
    console.log("Cancelando la creación del pedido...");
    onCancel();
  };

  const allInputsAreValid = () => {
    // TODO: Do actual logic
    return true;
  };

  if (!show) {
    return null;
  }

  return (
    <div className="relative flex flex-col flex-grow items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Crear pedido</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <FormInput type="number" placeholder="Número del pedido" />
        <FormInput
          type="number"
          placeholder="Total del pedido"
          value={order.total}
          disabled
        />
        <FormInput type="text" placeholder="Observaciones" />
        <footer className="flex justify-around mt-5">
          <Button
            color="red"
            onClick={(event: any) => {
              event.preventDefault();
              onCancel();
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!allInputsAreValid() || isCreatingOrder}
          >
            {isCreatingOrder ? "Creando..." : "Crear"}
          </Button>
        </footer>
      </form>
    </div>
  );
}
