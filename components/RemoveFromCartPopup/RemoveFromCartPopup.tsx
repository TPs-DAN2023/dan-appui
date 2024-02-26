import { Button } from "@/components";
import { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";

interface RemoveFromCartPopupProps {
  product?: IProduct;
  show: boolean;
  onCancel: () => void;
  onRemoveFromCart: (product?: IProduct) => void;
}

export default function RemoveFromCartPopup({
  product,
  show,
  onCancel,
  onRemoveFromCart,
}: RemoveFromCartPopupProps) {
  const [stock, setStock] = useState(1);
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: { product: IProduct; selectedStock: number }) =>
        item.product.id === product?.id
    );

    console.log("existingProductIndex", existingProductIndex);

    if (existingProductIndex !== -1) {
      setStock(cart[existingProductIndex].selectedStock);
    }
  }, [product?.id]);

  const handleCancel = (event: any) => {
    event.preventDefault();
    onCancel();
  };

  const handleRemove = (event: any) => {
    event.preventDefault();
    setIsRemovingFromCart(true);
    // Here you can call your API to create the category
    console.log("Quitado del carrito!");
    onRemoveFromCart(product);
    handleCancel(event);
  };

  const removeFromCartText =
    "Quitar " +
    (stock
      ? `${stock}` + (stock > 1 ? " unidades" : " unidad") + " del carrito"
      : " del carrito");

  const removingFromCardText =
    `Quitando ${stock}` +
    (stock > 1 ? " unidades" : " unidad") +
    " del carrito...";

  if (!show) {
    return null;
  }

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {" "}
          ¿Quitar todas las unidades de {product?.nombre} del carrito?
        </h2>
        <p className="mb-4 text-center">Se quitarán todas las unidades.</p>
        <div className="flex justify-around mt-4">
          <Button color="red" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleRemove} disabled={isRemovingFromCart}>
            {isRemovingFromCart ? removingFromCardText : removeFromCartText}
          </Button>
        </div>
      </div>
    </div>
  );
}
