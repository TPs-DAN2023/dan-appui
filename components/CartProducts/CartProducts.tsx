import { IProduct } from "@/interfaces";

interface CartProductsProps {
  selectedStockAndProductArray: { product: IProduct; selectedStock: number }[];
}

export default function CartProducts({
  selectedStockAndProductArray,
}: CartProductsProps) {
  return (
    // I want a table with id, nombre, cantidad, precio, subtotal, and a button to remove the product from the cart
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
      <div className="flex flex-col w-11/12 h-5/6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between w-full p-4 border-b">
          <h1 className="text-2xl font-bold">Carrito</h1>
        </div>
        <div className="flex flex-col w-full h-full p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-1/12">ID</th>
                <th className="w-3/12">Nombre</th>
                <th className="w-2/12">Cantidad</th>
                <th className="w-2/12">Precio</th>
                <th className="w-2/12">Subtotal</th>
                <th className="w-2/12">Eliminar</th>
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
                    <td>{product.precio}</td>
                    <td>{product.precio * product.stockActual}</td>
                    <td>X</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between w-full p-4 border-t">
          <h1 className="text-2xl font-bold">Total</h1>
          <h1 className="text-2xl font-bold">
            {/* {selectedStockAndProductArray.reduce(
              (acc, [product, selectedStock]) =>
                acc + product.precio * selectedStock,
              0
            )} */}
            chau
          </h1>
        </div>
      </div>
    </div>
  );
}
