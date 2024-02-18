import { CancelButton, ConfirmButton, FormInput } from "@/components";
import { IProduct } from "@/interfaces";
import { useState } from "react";

interface AddToCartPopupProps {
  product?: IProduct;
  show: boolean;
  onCancel: () => void;
  onAddToCart: () => void;
}

export default function AddToCartPopup({
  product,
  show,
  onCancel,
  onAddToCart,
}: AddToCartPopupProps) {
  const [stock, setStock] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleCancel = (event: any) => {
    event.preventDefault();
    setStock(0);
    onCancel();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsAddingToCart(true);
    // Here you can call your API to create the category
    console.log("Añadido al carrito!");
    handleCancel(event);
  };

  const addToCartText =
    "Añadir " +
    (stock
      ? `${stock}` + (stock > 1 ? " unidades" : " unidad") + " al carrito"
      : " al carrito");

  const addingToCardText =
    `Añadiendo ${stock}` +
    (stock > 1 ? " unidades" : " unidad") +
    " al carrito...";

  if (!show) {
    return null;
  }

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg min-w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Añadir {product?.nombre} al carrito
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <FormInput
            className=""
            type="number"
            placeholder="Cantidad a añadir al carrito"
            value={stock}
            min={1}
            max={product?.stockActual}
            required
            onChange={(e) => setStock(parseInt(e.target.value))}
          />
          <div className="flex justify-around mt-4">
            <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
            <ConfirmButton type="submit" disabled={isAddingToCart || !stock}>
              {isAddingToCart ? addingToCardText : addToCartText}
            </ConfirmButton>
          </div>
        </form>
      </div>
    </div>
  );
}
