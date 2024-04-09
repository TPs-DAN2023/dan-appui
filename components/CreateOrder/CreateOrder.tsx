import { Button, FormInput, Loading } from "@/components";
import { IOrder, IProduct } from "@/interfaces";
import { API_URLS, apiCall } from "@/services";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

interface CreateOrderProps {
  show: boolean;
  onCancel: () => void;
  selectedStockAndProductArray: { product: IProduct; selectedStock: number }[];
}

const incompleteOrder: IOrder = {
  numeroPedido: "",
  total: 0,
  observaciones: "",
  fecha: new Date().toISOString(),
  detallePedido: [],
  user: "",
};
const session = JSON.parse(localStorage.getItem("session") || "{}");

export default function CreateOrder({
  selectedStockAndProductArray,
  show,
  onCancel,
}: CreateOrderProps) {
  const completeOrderWithInformation = () => {
    incompleteOrder.total = selectedStockAndProductArray.reduce(
      (accumulator, { product, selectedStock }) =>
        accumulator + product.precio * selectedStock,
      0
    );
    incompleteOrder.detallePedido = selectedStockAndProductArray.map(
      ({ product, selectedStock }) => ({
        producto: product as IProduct,
        cantidad: selectedStock,
        descuento: 0,
        total: product.precio * selectedStock,
      })
    );
    incompleteOrder.cliente =
      Object.keys(session).length > 0 ? session.cliente : null;
    incompleteOrder.user =
      Object.keys(session).length > 0
        ? session.userName.toUpperCase()
        : "USUARIO";
  };

  completeOrderWithInformation();

  const [order, setOrder] = useState<IOrder>(incompleteOrder);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const removeItemsFromCart = () => {
    localStorage.removeItem("cart");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsCreatingOrder(true);
    console.log("Creando pedido...");
    setIsLoading(true);
    try {
      const data = await apiCall(`${API_URLS.orders}`, "POST", order);
      console.log("Pedido creado!", data);
      removeItemsFromCart();
      router.push(ROUTES.ORDERS);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingOrder(false);
      setIsLoading(false);
    }
  };

  const handleCancel = (event: React.FormEvent) => {
    event.preventDefault();
    setOrder(incompleteOrder);
    console.log("Cancelando la creación del pedido...");
    onCancel();
  };

  const allInputsAreValid = () => {
    return order.numeroPedido.toString().length > 0;
  };

  if (isLoading) {
    <Loading />;
  }

  if (!show) {
    return null;
  }

  return (
    <div className="relative flex flex-col flex-grow items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Crear pedido</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <FormInput
          type="number"
          placeholder="Número del pedido"
          value={order.numeroPedido}
          onChange={(e) => setOrder({ ...order, numeroPedido: e.target.value })}
          required
        />
        <FormInput
          type="string"
          placeholder="Usuario"
          value={`Usuario: ${order.user}`}
          disabled
        />
        <FormInput
          type="string"
          placeholder="Fecha del pedido"
          value={`Fecha: ${new Date(order.fecha).toLocaleDateString()}`}
          disabled
        />
        <FormInput
          type="string"
          placeholder="Cantidad de productos"
          value={`Cant. productos: ${order.detallePedido.length}`}
          disabled
        />
        <FormInput
          type="string"
          placeholder="Total del pedido"
          value={`Total: ${order.total}`}
          disabled
        />
        <FormInput
          type="string"
          placeholder="Observaciones"
          value={order.observaciones}
          onChange={(e) =>
            setOrder({ ...order, observaciones: e.target.value })
          }
        />
        <footer className="flex justify-around mt-5">
          <Button color="red" onClick={handleCancel}>
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
