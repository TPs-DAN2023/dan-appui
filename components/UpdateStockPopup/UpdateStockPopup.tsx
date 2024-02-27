import { Button, FormInput } from "@/components";
import { IProduct } from "@/interfaces";
import { API_URLS, apiCall } from "@/services";
import { useEffect, useState } from "react";

interface UpdateStockPopupProps {
  product?: IProduct;
  show: boolean;
  onCancel: () => void;
}

const MAX_STOCK = 100;

export default function UpdateStockPopup({
  product,
  show,
  onCancel,
}: UpdateStockPopupProps) {
  const [newStock, setNewStock] = useState<number>();
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);

  const handleCancel = (event: any) => {
    event.preventDefault();
    setNewStock(0);
    onCancel();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsUpdatingStock(true);

    try {
      const productNewStock = await apiCall<IProduct>(
        API_URLS.products + `/${product?.id}` + `?cantidad=${newStock}`,
        "PATCH"
      );
      console.log("Actualizado el stock!", productNewStock);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingStock(false);
      handleCancel(event);
    }
  };

  const updateStockText =
    "Actualizar " +
    (newStock
      ? `${newStock}` + (newStock > 1 ? " unidades" : " unidad") + " de stock"
      : " stock");

  if (!show) {
    return null;
  }

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg min-w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Actualizar el stock de {product?.nombre}
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <FormInput
            className=""
            type="number"
            placeholder="Actualizar con nuevo stock"
            value={product?.stockActual}
            min={0}
            max={MAX_STOCK}
            required
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setNewStock(value > MAX_STOCK ? MAX_STOCK : value);
            }}
          />
          <div className="flex justify-around mt-4">
            <Button color="red" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isUpdatingStock || !newStock}>
              {isUpdatingStock ? "Actualizando stock..." : updateStockText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
