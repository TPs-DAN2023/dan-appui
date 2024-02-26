import { IProduct } from "@/interfaces";
import { Button, IconButton } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface CartProductsProps {
  selectedStockAndProductArray: { product: IProduct; selectedStock: number }[];
  onClick: () => void;
  show: boolean;
}

export default function CartProducts({
  selectedStockAndProductArray,
  onClick,
  show,
}: CartProductsProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <div className="flex flex-col w-11/12 h-5/6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-x-2 w-full p-4 border-b">
          <IconButton onClick={() => {}}>
            <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
          </IconButton>
          <h1 className="text-2xl font-bold">Carrito</h1>
        </div>
        <div className="flex flex-col w-full h-full p-4 overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="w-1/12">ID</th>
                <th className="w-3/12">Nombre</th>
                <th className="w-2/12">Cantidad</th>
                <th className="w-2/12">Precio</th>
                <th className="w-2/12">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedStockAndProductArray.map(
                ({ product, selectedStock }) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nombre}</td>
                    <td>
                      {selectedStock}/{product.stockActual}
                    </td>
                    <td>$ {product.precio}</td>
                    <td>$ {product.precio * selectedStock}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between w-full p-4 border-t">
          <h1 className="text-2xl font-bold">Total</h1>
          <h1 className="text-2xl font-bold">
            ${" "}
            {selectedStockAndProductArray.reduce(
              (accumulator, { product, selectedStock }) =>
                accumulator + product.precio * selectedStock,
              0
            )}
          </h1>
        </div>
      </div>
      <footer className="flex justify-end w-full mt-5">
        <Button color="green" className="mr-6" onClick={onClick}>
          Continuar
        </Button>
      </footer>
    </div>
  );
}
