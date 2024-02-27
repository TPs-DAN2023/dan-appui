import { OrderStates } from "@/enums";
import { IOrder, IOrderState } from "@/interfaces";
import { useState } from "react";
import { Button } from "@/components";
import { API_URLS, apiCall } from "@/services";

interface ChangeOrderStateProps {
  order?: IOrder;
  show: boolean;
  onCancel: () => void;
}

export default function ChangeOrderStatePopup({
  order,
  show,
  onCancel,
}: ChangeOrderStateProps) {
  const emptyNewState: IOrderState = {
    detalle: "",
    estado: OrderStates.PENDIENTE,
    fechaEstado: "",
    userEstado: "",
  };

  const [newState, setNewState] = useState<IOrderState>(emptyNewState);
  const [isChangingState, setIsChangingState] = useState(false);

  const handleCancel = (event: any) => {
    event.preventDefault();
    setNewState(emptyNewState);
    onCancel();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsChangingState(true);

    try {
      const orderNewState = await apiCall<IOrder>(
        API_URLS.orders + `/${order?.id}` + `?estado=${newState.estado}`,
        "PATCH"
      );
      console.log("Actualizado el estado del pedido!", orderNewState);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChangingState(false);
      handleCancel(event);
    }

    handleCancel(event);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg min-w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Actualizar el stock del pedido con id {order?.id}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="newState" className="text-medium font-bold">
                Nuevo estado
              </label>
              <select
                id="newState"
                name="newState"
                value={newState.estado}
                onChange={(event) =>
                  setNewState({
                    ...newState,
                    estado: event.target.value as OrderStates,
                  })
                }
                className="w-[500px] overflow-auto p-2 border border-gray-300 rounded"
              >
                {Object.values(OrderStates).map((os, index) => (
                  <option key={index} value={os}>
                    {os}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-around gap-x-4">
              <Button color="red" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-grow">
                {isChangingState
                  ? "Cambiando estado..."
                  : `Cambiar estado a ${newState.estado}`}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
