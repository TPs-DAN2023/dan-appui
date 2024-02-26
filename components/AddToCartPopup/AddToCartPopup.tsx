import { Button, FormInput } from "@/components";
import { IProduct } from "@/interfaces";
import { useEffect, useState } from "react";

interface AddToCartPopupProps {
  product?: IProduct;
  show: boolean;
  onCancel: () => void;
  onAddToCart: (stock: number, product?: IProduct) => void;
}

export default function AddToCartPopup({
  product,
  show,
  onCancel,
  onAddToCart,
}: AddToCartPopupProps) {
  const [stock, setStock] = useState<number>();
  const [maxStockAvailable, setMaxStockAvailable] = useState<number>();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: { product: IProduct; selectedStock: number }) =>
        item.product.id === product?.id
    );
    console.log("existingProductIndex", existingProductIndex);
    setStock(1);
    setMaxStockAvailable(
      existingProductIndex !== -1
        ? product?.stockActual! - cart[existingProductIndex].selectedStock
        : product?.stockActual
    );
  }, [product?.id, product?.stockActual]);

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
    onAddToCart(stock!, product);
    handleCancel(event);
  };

  const addToCartText =
    "Añadir " +
    (stock
      ? `${stock}` + (stock > 1 ? " unidades" : " unidad") + " al carrito"
      : " al carrito");

  const addingToCardText =
    `Añadiendo ${stock}` +
    (stock! > 1 ? " unidades" : " unidad") +
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
            max={maxStockAvailable}
            required
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setStock(value > maxStockAvailable! ? maxStockAvailable : value);
            }}
          />
          <div className="flex justify-around mt-4">
            <Button color="red" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isAddingToCart || !stock}>
              {isAddingToCart ? addingToCardText : addToCartText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
